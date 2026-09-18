--[[
	GameConfig (ModuleScript)
	Location: ReplicatedStorage > Modules > GameConfig

	Central place for balance numbers and constants so the game can be
	tuned without touching service code. Only Phase 1 values are filled
	in with real numbers; later-phase tables exist so future systems
	(stores, customers, progression) have a stable place to plug into.
]]

local GameConfig = {}

-- ===== STARTING VALUES =====
GameConfig.STARTING_CASH = 1000
GameConfig.STARTING_MALL_LEVEL = 1
GameConfig.STARTING_MALL_NAME = "My Mall"
GameConfig.STARTING_PRESTIGE = 0
GameConfig.STARTING_SATISFACTION = 100

-- ===== DATASTORE / SAVING =====
GameConfig.DATASTORE_NAME = "BillionaireMall_PlayerData_v1"
GameConfig.AUTOSAVE_INTERVAL = 180 -- seconds between automatic saves
GameConfig.SAVE_RETRY_ATTEMPTS = 3
GameConfig.SAVE_RETRY_DELAY = 2 -- seconds

-- ===== PLOTS =====
GameConfig.MAX_PLOTS = 6
GameConfig.PLOT_SIZE = Vector3.new(80, 1, 80)
GameConfig.PLOT_SPACING = 120 -- studs between plot centers
GameConfig.PLOTS_PER_ROW = 3

-- ===== CUSTOMERS (placeholders wired up in Phase 3) =====
GameConfig.MAX_CUSTOMERS_PER_PLOT = 15
GameConfig.CUSTOMER_SPAWN_RATE = 5 -- seconds between customer spawns

-- ===== MALL LEVELS (placeholders wired up in Phase 5) =====
GameConfig.MALL_LEVEL_NAMES = {
	[1] = "Small Store",
	[2] = "Shopping Center",
	[3] = "Mega Mall",
	[4] = "Luxury Mall",
	[5] = "Billionaire Mall",
}

GameConfig.MALL_LEVEL_REQUIREMENTS = {
	[2] = { TotalEarnings = 10000, StoreCount = 3 },
	[3] = { TotalEarnings = 100000, StoreCount = 6 },
	[4] = { TotalEarnings = 1000000, StoreCount = 10 },
	[5] = { TotalEarnings = 10000000, StoreCount = 15 },
}

return GameConfig
