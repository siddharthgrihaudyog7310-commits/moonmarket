--[[
	Utility (ModuleScript)
	Location: ReplicatedStorage > Modules > Utility

	Small shared helper functions. Kept generic so any service or
	future module can require it.
]]

local Utility = {}

-- Deep-copies a plain data table (no Instances, no cycles).
function Utility.DeepCopy(original)
	local copy = {}
	for key, value in pairs(original) do
		if type(value) == "table" then
			copy[key] = Utility.DeepCopy(value)
		else
			copy[key] = value
		end
	end
	return copy
end

-- Fills in any keys missing from `data` using `defaults`, recursively.
-- Existing values in `data` are never overwritten. Used to safely merge
-- old saved profiles with newly added default fields.
function Utility.ApplyDefaults(data, defaults)
	for key, defaultValue in pairs(defaults) do
		if data[key] == nil then
			if type(defaultValue) == "table" then
				data[key] = Utility.DeepCopy(defaultValue)
			else
				data[key] = defaultValue
			end
		elseif type(defaultValue) == "table" and type(data[key]) == "table" then
			Utility.ApplyDefaults(data[key], defaultValue)
		end
	end
	return data
end

return Utility
