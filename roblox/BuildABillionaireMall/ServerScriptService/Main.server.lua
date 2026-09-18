--[[
	Main (Script)
	Location: ServerScriptService > Main

	Entry point / orchestrator. Waits for Bootstrap to finish, then wires
	up player join/leave to PlayerDataService + PlotService + EconomyService.
	Does not build any objects itself -- that is Bootstrap's job -- and does
	not contain balance numbers -- those live in GameConfig.
]]

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerScriptService = game:GetService("ServerScriptService")

-- Wait for Bootstrap.server.lua to finish creating folders/remotes/plots.
-- Checking the attribute BEFORE waiting on the signal avoids a race where
-- Bootstrap finishes before this script starts listening.
if not ReplicatedStorage:GetAttribute("BootstrapComplete") then
	ReplicatedStorage:GetAttributeChangedSignal("BootstrapComplete"):Wait()
end

local Services = ServerScriptService:WaitForChild("Services")
local PlayerDataService = require(Services:WaitForChild("PlayerDataService"))
local PlotService = require(Services:WaitForChild("PlotService"))
local EconomyService = require(Services:WaitForChild("EconomyService"))

local Remotes = ReplicatedStorage:WaitForChild("Remotes")
local RequestDataFunction = Remotes:WaitForChild("RequestData")

RequestDataFunction.OnServerInvoke = function(player)
	return PlayerDataService.GetPublicData(player)
end

local function onCharacterAdded(player)
	local plot = PlotService.GetPlotForPlayer(player)
	if plot then
		PlotService.TeleportPlayerToPlot(player, plot)
	end
end

local function onPlayerAdded(player)
	player.CharacterAdded:Connect(function()
		onCharacterAdded(player)
	end)

	-- Yields on the DataStore call; running this per-player on its own
	-- thread keeps one slow/failed load from blocking other players.
	task.spawn(function()
		local profile = PlayerDataService.LoadProfile(player)

		local plot = PlotService.AssignPlot(player, profile.PlotId, profile.MallName)
		if plot then
			profile.PlotId = plot:GetAttribute("PlotId")
			if player.Character then
				onCharacterAdded(player)
			end
		else
			warn("Main: could not assign a plot to " .. player.Name .. " (server full)")
		end

		EconomyService.PushUpdate(player)
	end)
end

local function onPlayerRemoving(player)
	PlotService.ReleasePlot(player)
	PlayerDataService.SaveProfile(player)
	PlayerDataService.ReleaseProfile(player)
end

Players.PlayerAdded:Connect(onPlayerAdded)
Players.PlayerRemoving:Connect(onPlayerRemoving)

-- Players already in-game if this script reloads (e.g. Studio script hot-reload).
for _, player in ipairs(Players:GetPlayers()) do
	task.spawn(onPlayerAdded, player)
end

PlayerDataService.StartAutosave()

game:BindToClose(function()
	if #Players:GetPlayers() == 0 then
		return
	end
	PlayerDataService.SaveAllProfiles()
	task.wait(2) -- give SetAsync calls a moment to finish before the server closes
end)

print("[Main] Build A Billionaire Mall server ready.")
