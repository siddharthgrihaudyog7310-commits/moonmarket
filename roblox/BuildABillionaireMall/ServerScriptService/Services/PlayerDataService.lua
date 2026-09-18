--[[
	PlayerDataService (ModuleScript)
	Location: ServerScriptService > Services > PlayerDataService

	Owns all persistent player data: loading it from DataStoreService,
	keeping an in-memory copy while the player is in the server,
	autosaving it, and saving it when the player leaves or the server
	shuts down. Every other service (Economy, Plot, and future ones)
	reads/writes through the profile table returned by GetProfile.

	Nothing outside this module should call DataStoreService directly.
]]

local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local GameConfig = require(ReplicatedStorage.Modules.GameConfig)
local Utility = require(ReplicatedStorage.Modules.Utility)

local PlayerDataService = {}

local dataStore = DataStoreService:GetDataStore(GameConfig.DATASTORE_NAME)

-- In-memory profiles, keyed by UserId. Cleared when a player leaves.
local profiles = {}

-- The shape every profile is guaranteed to have. Tables not used yet
-- (Stores/Workers/Expansions/Decorations/Prices) are here so later
-- phases can save into them without a migration step.
local DEFAULT_PROFILE = {
	Cash = GameConfig.STARTING_CASH,
	MallLevel = GameConfig.STARTING_MALL_LEVEL,
	MallName = GameConfig.STARTING_MALL_NAME,
	Prestige = GameConfig.STARTING_PRESTIGE,
	Satisfaction = GameConfig.STARTING_SATISFACTION,
	TotalEarnings = 0,
	PlotId = nil,
	Stores = {},
	Workers = {},
	Expansions = {},
	Decorations = {},
	Prices = {},
}

local function attemptDataStoreCall(callback)
	local success, result
	for attempt = 1, GameConfig.SAVE_RETRY_ATTEMPTS do
		success, result = pcall(callback)
		if success then
			return true, result
		end
		warn(("PlayerDataService: DataStore call failed (attempt %d/%d): %s"):format(
			attempt,
			GameConfig.SAVE_RETRY_ATTEMPTS,
			tostring(result)
		))
		if attempt < GameConfig.SAVE_RETRY_ATTEMPTS then
			task.wait(GameConfig.SAVE_RETRY_DELAY)
		end
	end
	return false, result
end

-- Loads (or creates) a profile for `player` and stores it in memory.
-- Yields while the DataStore call is in flight; call this from a
-- spawned thread (Main.server.lua does this on PlayerAdded).
function PlayerDataService.LoadProfile(player)
	local key = "Player_" .. player.UserId

	local success, savedData = attemptDataStoreCall(function()
		return dataStore:GetAsync(key)
	end)

	local profile
	if success and savedData ~= nil then
		profile = Utility.ApplyDefaults(savedData, DEFAULT_PROFILE)
	else
		if not success then
			warn("PlayerDataService: Failed to load data for " .. player.Name .. ", using defaults.")
		end
		profile = Utility.DeepCopy(DEFAULT_PROFILE)
	end

	profiles[player.UserId] = profile
	return profile
end

-- Returns the live profile table (mutate it directly; it is saved by reference).
function PlayerDataService.GetProfile(player)
	return profiles[player.UserId]
end

-- Returns only the fields the client is allowed to see, for UI/remotes.
function PlayerDataService.GetPublicData(player)
	local profile = profiles[player.UserId]
	if not profile then
		return nil
	end
	return {
		Cash = profile.Cash,
		MallLevel = profile.MallLevel,
		MallName = profile.MallName,
		Prestige = profile.Prestige,
		Satisfaction = profile.Satisfaction,
	}
end

function PlayerDataService.SaveProfile(player)
	local profile = profiles[player.UserId]
	if not profile then
		return false
	end

	local key = "Player_" .. player.UserId
	local success = attemptDataStoreCall(function()
		dataStore:SetAsync(key, profile)
	end)

	if not success then
		warn("PlayerDataService: Failed to save data for " .. player.Name)
	end

	return success
end

-- Drops the in-memory copy. Call only after a final save.
function PlayerDataService.ReleaseProfile(player)
	profiles[player.UserId] = nil
end

function PlayerDataService.StartAutosave()
	task.spawn(function()
		while true do
			task.wait(GameConfig.AUTOSAVE_INTERVAL)
			for _, player in ipairs(Players:GetPlayers()) do
				if profiles[player.UserId] then
					PlayerDataService.SaveProfile(player)
				end
			end
		end
	end)
end

-- Used by Main.server.lua inside game:BindToClose().
function PlayerDataService.SaveAllProfiles()
	for _, player in ipairs(Players:GetPlayers()) do
		if profiles[player.UserId] then
			PlayerDataService.SaveProfile(player)
		end
	end
end

return PlayerDataService
