--[[
	Bootstrap (Script)
	Location: ServerScriptService > Bootstrap

	Runs once when the server starts. Creates every non-script object the
	game needs (folders, RemoteEvents/RemoteFunctions, the 6 mall plots
	with a starting Mini Mart building, spawn points, etc.) if they don't
	already exist. Safe to run on a server that already has these objects:
	each piece is checked before it is created, so nothing is duplicated
	or reset.

	Sets ReplicatedStorage attribute "BootstrapComplete" = true when done.
	Main.server.lua waits on that attribute before wiring up players.
]]

local Workspace = game:GetService("Workspace")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerStorage = game:GetService("ServerStorage")
local ServerScriptService = game:GetService("ServerScriptService")

local GameConfig = require(ReplicatedStorage:WaitForChild("Modules"):WaitForChild("GameConfig"))

-- ===================== SMALL HELPERS =====================

local function ensureFolder(parent, name)
	local existing = parent:FindFirstChild(name)
	if existing and existing:IsA("Folder") then
		return existing
	end
	local folder = Instance.new("Folder")
	folder.Name = name
	folder.Parent = parent
	return folder
end

local function ensureRemoteEvent(parent, name)
	local existing = parent:FindFirstChild(name)
	if existing and existing:IsA("RemoteEvent") then
		return existing
	end
	local remote = Instance.new("RemoteEvent")
	remote.Name = name
	remote.Parent = parent
	return remote
end

local function ensureRemoteFunction(parent, name)
	local existing = parent:FindFirstChild(name)
	if existing and existing:IsA("RemoteFunction") then
		return existing
	end
	local remote = Instance.new("RemoteFunction")
	remote.Name = name
	remote.Parent = parent
	return remote
end

local function createPart(props)
	local part = Instance.new("Part")
	part.Anchored = true
	part.CanCollide = props.CanCollide ~= false
	part.CanTouch = props.CanTouch ~= false
	part.Material = props.Material or Enum.Material.SmoothPlastic
	part.Color = props.Color or Color3.fromRGB(255, 255, 255)
	part.Size = props.Size
	part.CFrame = props.CFrame
	part.Name = props.Name or "Part"
	part.Transparency = props.Transparency or 0
	part.Parent = props.Parent
	return part
end

-- ===================== TOP-LEVEL FOLDER STRUCTURE =====================

local function setupWorkspaceFolders()
	ensureFolder(Workspace, "Map")
	local mallPlots = ensureFolder(Workspace, "MallPlots")
	ensureFolder(Workspace, "CustomerSpawns")
	ensureFolder(Workspace, "NPCPaths")
	ensureFolder(Workspace, "Stores")
	ensureFolder(Workspace, "Decorations")
	ensureFolder(Workspace, "World")
	return mallPlots
end

local function setupReplicatedStorageFolders()
	local remotes = ensureFolder(ReplicatedStorage, "Remotes")
	ensureFolder(ReplicatedStorage, "Modules") -- ModuleScripts live here (placed manually, see install guide)
	ensureFolder(ReplicatedStorage, "Assets")
	return remotes
end

local function setupServerStorageFolders()
	ensureFolder(ServerStorage, "StoreModels")
	ensureFolder(ServerStorage, "NPCModels")
	ensureFolder(ServerStorage, "WorkerModels")
	ensureFolder(ServerStorage, "MapAssets")
end

local function setupServerScriptServiceFolders()
	ensureFolder(ServerScriptService, "Services") -- ModuleScripts live here (placed manually, see install guide)
end

local function setupRemotes(remotesFolder)
	-- Phase 1 uses UpdateUI + RequestData. The rest are created now so
	-- later phases can be added without another folder-setup pass.
	ensureRemoteEvent(remotesFolder, "BuildStore")
	ensureRemoteEvent(remotesFolder, "UpgradeStore")
	ensureRemoteEvent(remotesFolder, "HireWorker")
	ensureRemoteEvent(remotesFolder, "SetPrice")
	ensureRemoteEvent(remotesFolder, "ExpandMall")
	ensureRemoteEvent(remotesFolder, "UpdateUI")
	ensureRemoteFunction(remotesFolder, "RequestData")
end

-- ===================== PLOT / STARTING MALL GENERATION =====================

-- Builds one blocky "Mini Mart" starting building inside a plot.
-- Kept intentionally simple (Level 1 = "Simple and basic" per the visual
-- style guide) using plain Parts so no mesh/model assets are required.
local function buildStartingMall(plot, plotCenter)
	local building = Instance.new("Model")
	building.Name = "StartingMall"
	building.Parent = plot

	local buildingCenter = plotCenter + Vector3.new(-22, 0, -22)

	local floor = createPart({
		Name = "Floor",
		Parent = building,
		Size = Vector3.new(20, 1, 20),
		CFrame = CFrame.new(buildingCenter + Vector3.new(0, 1, 0)),
		Color = Color3.fromRGB(210, 210, 210),
		Material = Enum.Material.SmoothPlastic,
	})

	local wallColor = Color3.fromRGB(120, 170, 235)
	local wallHeight = 12
	local wallY = floor.Position.Y + 1 + wallHeight / 2

	createPart({
		Name = "WallBack",
		Parent = building,
		Size = Vector3.new(20, wallHeight, 1),
		CFrame = CFrame.new(buildingCenter + Vector3.new(0, wallY - 1, -9.5)),
		Color = wallColor,
	})
	createPart({
		Name = "WallLeft",
		Parent = building,
		Size = Vector3.new(1, wallHeight, 20),
		CFrame = CFrame.new(buildingCenter + Vector3.new(-9.5, wallY - 1, 0)),
		Color = wallColor,
	})
	createPart({
		Name = "WallRight",
		Parent = building,
		Size = Vector3.new(1, wallHeight, 20),
		CFrame = CFrame.new(buildingCenter + Vector3.new(9.5, wallY - 1, 0)),
		Color = wallColor,
	})
	-- Front wall is split with a gap in the middle to act as the doorway.
	createPart({
		Name = "WallFrontLeft",
		Parent = building,
		Size = Vector3.new(7, wallHeight, 1),
		CFrame = CFrame.new(buildingCenter + Vector3.new(-6.5, wallY - 1, 9.5)),
		Color = wallColor,
	})
	createPart({
		Name = "WallFrontRight",
		Parent = building,
		Size = Vector3.new(7, wallHeight, 1),
		CFrame = CFrame.new(buildingCenter + Vector3.new(6.5, wallY - 1, 9.5)),
		Color = wallColor,
	})

	createPart({
		Name = "Roof",
		Parent = building,
		Size = Vector3.new(21, 1, 21),
		CFrame = CFrame.new(buildingCenter + Vector3.new(0, wallY + wallHeight / 2 - 1 + 1, 0)),
		Color = Color3.fromRGB(60, 60, 70),
	})

	local signPart = createPart({
		Name = "MallNameSign",
		Parent = building,
		Size = Vector3.new(10, 3, 0.5),
		CFrame = CFrame.new(buildingCenter + Vector3.new(0, wallY + 5, 9.8)),
		Color = Color3.fromRGB(255, 255, 255),
		CanCollide = false,
	})

	local billboard = Instance.new("BillboardGui")
	billboard.Name = "MallNameBillboard"
	billboard.Size = UDim2.new(0, 200, 0, 50)
	billboard.StudsOffset = Vector3.new(0, 0, 0)
	billboard.AlwaysOnTop = true
	billboard.Parent = signPart

	local label = Instance.new("TextLabel")
	label.Name = "MallNameLabel"
	label.Size = UDim2.fromScale(1, 1)
	label.BackgroundTransparency = 1
	label.Font = Enum.Font.GothamBold
	label.TextScaled = true
	label.TextColor3 = Color3.fromRGB(20, 20, 20)
	label.Text = "For Sale"
	label.Parent = billboard

	local storeSign = createPart({
		Name = "MiniMartLabel",
		Parent = building,
		Size = Vector3.new(6, 1.5, 0.3),
		CFrame = CFrame.new(buildingCenter + Vector3.new(0, wallY - 4, 9.8)),
		Color = Color3.fromRGB(255, 220, 60),
		CanCollide = false,
	})
	local storeBillboard = Instance.new("BillboardGui")
	storeBillboard.Size = UDim2.new(0, 150, 0, 30)
	storeBillboard.AlwaysOnTop = true
	storeBillboard.Parent = storeSign
	local storeLabel = Instance.new("TextLabel")
	storeLabel.Size = UDim2.fromScale(1, 1)
	storeLabel.BackgroundTransparency = 1
	storeLabel.Font = Enum.Font.GothamBold
	storeLabel.TextScaled = true
	storeLabel.TextColor3 = Color3.fromRGB(30, 30, 30)
	storeLabel.Text = "Mini Mart"
	storeLabel.Parent = storeBillboard

	return building
end

local function buildPlot(plotsFolder, plotId, plotCenter)
	local plot = Instance.new("Model")
	plot.Name = "Plot" .. plotId
	plot.Parent = plotsFolder

	plot:SetAttribute("PlotId", plotId)
	plot:SetAttribute("OwnerUserId", 0)
	plot:SetAttribute("OwnerName", "")

	local ground = createPart({
		Name = "Ground",
		Parent = plot,
		Size = GameConfig.PLOT_SIZE,
		CFrame = CFrame.new(plotCenter),
		Color = Color3.fromRGB(225, 220, 210),
		Material = Enum.Material.Concrete,
	})
	plot.PrimaryPart = ground

	buildStartingMall(plot, plotCenter)

	createPart({
		Name = "BuildZone",
		Parent = plot,
		Size = Vector3.new(70, 0.2, 70),
		CFrame = CFrame.new(plotCenter + Vector3.new(0, 1.1, 0)),
		Color = Color3.fromRGB(90, 220, 120),
		Transparency = 0.75,
		CanCollide = false,
		CanTouch = false,
	})

	createPart({
		Name = "ExpansionZone",
		Parent = plot,
		Size = Vector3.new(30, 0.2, 78),
		CFrame = CFrame.new(plotCenter + Vector3.new(55, 1.1, 0)),
		Color = Color3.fromRGB(90, 160, 255),
		Transparency = 0.8,
		CanCollide = false,
		CanTouch = false,
	})

	createPart({
		Name = "ParkingArea",
		Parent = plot,
		Size = Vector3.new(18, 0.2, 30),
		CFrame = CFrame.new(plotCenter + Vector3.new(0, 1.1, -55)),
		Color = Color3.fromRGB(80, 80, 90),
		Transparency = 0.2,
		CanCollide = false,
		CanTouch = false,
	})

	createPart({
		Name = "PlayerSpawn",
		Parent = plot,
		Size = Vector3.new(4, 1, 4),
		CFrame = CFrame.new(plotCenter + Vector3.new(0, 1.5, 30)),
		Color = Color3.fromRGB(80, 200, 255),
		Transparency = 0.5,
		CanCollide = false,
		CanTouch = false,
	})

	createPart({
		Name = "CustomerSpawn",
		Parent = plot,
		Size = Vector3.new(4, 1, 4),
		CFrame = CFrame.new(plotCenter + Vector3.new(15, 1.5, 35)),
		Color = Color3.fromRGB(255, 170, 60),
		Transparency = 0.5,
		CanCollide = false,
		CanTouch = false,
	})

	createPart({
		Name = "WorkerSpawn",
		Parent = plot,
		Size = Vector3.new(4, 1, 4),
		CFrame = CFrame.new(plotCenter + Vector3.new(-15, 1.5, 35)),
		Color = Color3.fromRGB(200, 120, 255),
		Transparency = 0.5,
		CanCollide = false,
		CanTouch = false,
	})

	return plot
end

local function setupMallPlots(plotsFolder)
	for plotId = 1, GameConfig.MAX_PLOTS do
		if not plotsFolder:FindFirstChild("Plot" .. plotId) then
			local row = math.floor((plotId - 1) / GameConfig.PLOTS_PER_ROW)
			local col = (plotId - 1) % GameConfig.PLOTS_PER_ROW
			local center = Vector3.new(col * GameConfig.PLOT_SPACING, 0, row * GameConfig.PLOT_SPACING)
			buildPlot(plotsFolder, plotId, center)
		end
	end
end

-- ===================== RUN =====================

local mallPlots = setupWorkspaceFolders()
local remotes = setupReplicatedStorageFolders()
setupServerStorageFolders()
setupServerScriptServiceFolders()
setupRemotes(remotes)
setupMallPlots(mallPlots)

ReplicatedStorage:SetAttribute("BootstrapComplete", true)
print("[Bootstrap] Build A Billionaire Mall world is ready.")
