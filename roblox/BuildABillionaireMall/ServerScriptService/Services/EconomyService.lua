--[[
	EconomyService (ModuleScript)
	Location: ServerScriptService > Services > EconomyService

	The ONLY place cash is ever changed. Everything is server-authoritative:
	there is no remote that lets a client set or add its own cash. Future
	systems (store purchases, customer revenue, worker salaries) must call
	AddCash / RemoveCash here rather than touching profile.Cash directly.
]]

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local PlayerDataService = require(script.Parent.PlayerDataService)

local Remotes = ReplicatedStorage:WaitForChild("Remotes")
local UpdateUIEvent = Remotes:WaitForChild("UpdateUI")

local EconomyService = {}

local function pushUpdate(player)
	local data = PlayerDataService.GetPublicData(player)
	if data then
		UpdateUIEvent:FireClient(player, data)
	end
end

function EconomyService.GetCash(player)
	local profile = PlayerDataService.GetProfile(player)
	return profile and profile.Cash or 0
end

function EconomyService.CanAfford(player, amount)
	if type(amount) ~= "number" or amount < 0 then
		return false
	end
	return EconomyService.GetCash(player) >= amount
end

-- Returns true/false for success so callers (e.g. a future StoreService)
-- can react to a failed transaction instead of assuming it worked.
function EconomyService.AddCash(player, amount)
	if type(amount) ~= "number" or amount <= 0 then
		return false
	end

	local profile = PlayerDataService.GetProfile(player)
	if not profile then
		return false
	end

	profile.Cash += amount
	profile.TotalEarnings += amount
	pushUpdate(player)
	return true
end

function EconomyService.RemoveCash(player, amount)
	if type(amount) ~= "number" or amount <= 0 then
		return false
	end

	if not EconomyService.CanAfford(player, amount) then
		return false
	end

	local profile = PlayerDataService.GetProfile(player)
	profile.Cash -= amount
	pushUpdate(player)
	return true
end

-- Lets Main.server.lua push the initial UI state right after a profile loads.
function EconomyService.PushUpdate(player)
	pushUpdate(player)
end

return EconomyService
