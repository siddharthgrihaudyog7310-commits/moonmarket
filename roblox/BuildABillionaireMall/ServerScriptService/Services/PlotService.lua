--[[
	PlotService (ModuleScript)
	Location: ServerScriptService > Services > PlotService

	Assigns each player one of the plots created by Bootstrap.server.lua
	under Workspace.MallPlots, releases it when they leave, and moves
	their character to it. Ownership is tracked with attributes on the
	plot Model itself (OwnerUserId / OwnerName) so it's trivially visible
	in the Explorer while testing.
]]

local Workspace = game:GetService("Workspace")

local PlotService = {}

local function getPlotsFolder()
	return Workspace:WaitForChild("MallPlots")
end

local function getAllPlots()
	local plots = {}
	for _, plot in ipairs(getPlotsFolder():GetChildren()) do
		if plot:IsA("Model") and plot:GetAttribute("PlotId") ~= nil then
			table.insert(plots, plot)
		end
	end
	table.sort(plots, function(a, b)
		return a:GetAttribute("PlotId") < b:GetAttribute("PlotId")
	end)
	return plots
end

function PlotService.GetPlotById(plotId)
	for _, plot in ipairs(getAllPlots()) do
		if plot:GetAttribute("PlotId") == plotId then
			return plot
		end
	end
	return nil
end

function PlotService.GetPlotForPlayer(player)
	for _, plot in ipairs(getAllPlots()) do
		if plot:GetAttribute("OwnerUserId") == player.UserId then
			return plot
		end
	end
	return nil
end

function PlotService.GetFreePlot()
	for _, plot in ipairs(getAllPlots()) do
		if plot:GetAttribute("OwnerUserId") == 0 then
			return plot
		end
	end
	return nil
end

local function setMallNameSign(plot, text)
	local sign = plot:FindFirstChild("MallNameSign", true)
	if not sign then
		return
	end
	local billboard = sign:FindFirstChildOfClass("BillboardGui")
	if not billboard then
		return
	end
	local label = billboard:FindFirstChildOfClass("TextLabel")
	if label then
		label.Text = text
	end
end

local function applyPlotOwnership(plot, player, mallName)
	plot:SetAttribute("OwnerUserId", player.UserId)
	plot:SetAttribute("OwnerName", player.Name)
	setMallNameSign(plot, mallName or (player.Name .. "'s Mall"))
end

-- Gives `player` a plot. Prefers their previously saved plot (savedPlotId)
-- if it is free or still theirs, otherwise hands out the first free plot.
-- Returns nil if the server is full (all plots owned by other players).
function PlotService.AssignPlot(player, savedPlotId, mallName)
	if savedPlotId then
		local savedPlot = PlotService.GetPlotById(savedPlotId)
		if savedPlot then
			local owner = savedPlot:GetAttribute("OwnerUserId")
			if owner == 0 or owner == player.UserId then
				applyPlotOwnership(savedPlot, player, mallName)
				return savedPlot
			end
		end
	end

	local plot = PlotService.GetFreePlot()
	if not plot then
		warn("PlotService: No free plots available for " .. player.Name)
		return nil
	end

	applyPlotOwnership(plot, player, mallName)
	return plot
end

function PlotService.ReleasePlot(player)
	local plot = PlotService.GetPlotForPlayer(player)
	if plot then
		plot:SetAttribute("OwnerUserId", 0)
		plot:SetAttribute("OwnerName", "")
		setMallNameSign(plot, "For Sale")
	end
end

function PlotService.TeleportPlayerToPlot(player, plot)
	if not plot then
		return
	end
	local spawnPart = plot:FindFirstChild("PlayerSpawn", true)
	if not spawnPart then
		return
	end

	local character = player.Character or player.CharacterAdded:Wait()
	local rootPart = character:WaitForChild("HumanoidRootPart", 5)
	if rootPart then
		rootPart.CFrame = spawnPart.CFrame + Vector3.new(0, 5, 0)
	end
end

return PlotService
