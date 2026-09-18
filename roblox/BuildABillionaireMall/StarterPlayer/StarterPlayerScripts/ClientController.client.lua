--[[
	ClientController (LocalScript)
	Location: StarterPlayer > StarterPlayerScripts > ClientController

	Builds the top bar UI entirely in code (no manual GUI building
	required in Studio) and keeps it in sync with the server via the
	UpdateUI RemoteEvent and RequestData RemoteFunction. Phase 1 only
	needs to show Cash and Mall Level, but Prestige/Satisfaction are
	included since the server already sends them and future phases will
	want the same top bar.
]]

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local player = Players.LocalPlayer

local Remotes = ReplicatedStorage:WaitForChild("Remotes")
local UpdateUIEvent = Remotes:WaitForChild("UpdateUI")
local RequestDataFunction = Remotes:WaitForChild("RequestData")

-- ===================== BUILD UI =====================

local screenGui = Instance.new("ScreenGui")
screenGui.Name = "MainUI"
screenGui.ResetOnSpawn = false
screenGui.IgnoreGuiInset = false
screenGui.Parent = player:WaitForChild("PlayerGui")

local topBar = Instance.new("Frame")
topBar.Name = "TopBar"
topBar.AnchorPoint = Vector2.new(0.5, 0)
topBar.Position = UDim2.new(0.5, 0, 0, 10)
topBar.Size = UDim2.new(1, -20, 0, 60)
topBar.BackgroundColor3 = Color3.fromRGB(25, 28, 38)
topBar.BackgroundTransparency = 0.1
topBar.BorderSizePixel = 0
topBar.Parent = screenGui

local topBarCorner = Instance.new("UICorner")
topBarCorner.CornerRadius = UDim.new(0, 14)
topBarCorner.Parent = topBar

local layout = Instance.new("UIListLayout")
layout.FillDirection = Enum.FillDirection.Horizontal
layout.HorizontalAlignment = Enum.HorizontalAlignment.Center
layout.VerticalAlignment = Enum.VerticalAlignment.Center
layout.Padding = UDim.new(0, 6)
layout.SortOrder = Enum.SortOrder.LayoutOrder
layout.Parent = topBar

local padding = Instance.new("UIPadding")
padding.PaddingLeft = UDim.new(0, 16)
padding.PaddingRight = UDim.new(0, 16)
padding.Parent = topBar

local function createStat(order, icon, initialText)
	local holder = Instance.new("Frame")
	holder.Name = icon .. "Stat"
	holder.BackgroundTransparency = 1
	holder.Size = UDim2.new(0, 190, 1, 0)
	holder.LayoutOrder = order
	holder.Parent = topBar

	local label = Instance.new("TextLabel")
	label.Name = "Label"
	label.BackgroundTransparency = 1
	label.Size = UDim2.fromScale(1, 1)
	label.Font = Enum.Font.GothamBold
	label.TextScaled = true
	label.TextColor3 = Color3.fromRGB(255, 255, 255)
	label.TextXAlignment = Enum.TextXAlignment.Left
	label.Text = icon .. "  " .. initialText
	label.Parent = holder

	local sizeConstraint = Instance.new("UITextSizeConstraint")
	sizeConstraint.MaxTextSize = 22
	sizeConstraint.Parent = label

	return label
end

local cashLabel = createStat(1, "💰", "$0")
local mallLabel = createStat(2, "🏬", "Loading...")
local prestigeLabel = createStat(3, "⭐", "0")
local satisfactionLabel = createStat(4, "😊", "100%")

local function formatCash(amount)
	return "$" .. string.format("%d", amount or 0)
end

local function applyData(data)
	if not data then
		return
	end
	cashLabel.Text = "💰  " .. formatCash(data.Cash)
	mallLabel.Text = ("🏬  Level %d - %s"):format(data.MallLevel or 1, data.MallName or "My Mall")
	prestigeLabel.Text = "⭐  " .. tostring(data.Prestige or 0)
	satisfactionLabel.Text = "😊  " .. tostring(data.Satisfaction or 100) .. "%"
end

-- ===================== SYNC WITH SERVER =====================

UpdateUIEvent.OnClientEvent:Connect(applyData)

task.spawn(function()
	local data
	for _ = 1, 15 do
		local ok, result = pcall(function()
			return RequestDataFunction:InvokeServer()
		end)
		if ok and result then
			data = result
			break
		end
		task.wait(1)
	end
	applyData(data)
end)
