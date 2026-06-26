local hct = require("hct-oklch")

local M = {}

M.primary = "#00bfff"
M.error = "#ff0062"

M.hctToHex = hct.hctToHex
M.hexToHct = hct.hexToHct

local function getNeutralChroma()
  return 2
end
M.getNeutralChroma = getNeutralChroma

function M.createPrimaryVariants(sourceColor, dark)
  local h = sourceColor.hue
  local chroma = 40
  return {
    color = hct.hctToHex(h, chroma, dark and 80 or 40),
    foreground = hct.hctToHex(h, chroma, dark and 20 or 98),
  }
end

function M.createSecondaryVariants(sourceColor, dark, chroma)
  local h = sourceColor.hue
  if chroma == nil then chroma = dark and 26 or 32 end
  return {
    color = hct.hctToHex(h, chroma, dark and 30 or 90),
    foreground = hct.hctToHex(h, chroma, dark and 80 or 20),
  }
end

function M.createBorderColor(sourceColor, dark)
  local h = sourceColor.hue
  local chroma = getNeutralChroma()
  return hct.hctToHex(h, chroma, dark and 20 or 80)
end

function M.createSurfaceVariants(sourceColor, dark, chroma)
  local h = sourceColor.hue
  if chroma == nil then chroma = getNeutralChroma() end
  local darkTones = { 8, 12, 13, 15 }
  local lightTones = { 99, 95, 94, 92 }
  local tones = dark and darkTones or lightTones
  return {
    ["1"] = hct.hctToHex(h, chroma, tones[1]),
    ["2"] = hct.hctToHex(h, chroma * 1.2, tones[2]),
    ["3"] = hct.hctToHex(h, chroma * 1.3, tones[3]),
    ["4"] = hct.hctToHex(h, chroma * 1.4, tones[4]),
  }
end

function M.createTextVariants(sourceColor, dark)
  local h = sourceColor.hue
  local chroma = getNeutralChroma()
  return {
    foreground = hct.hctToHex(h, chroma, dark and 85 or 15),
    mutedForeground = hct.hctToHex(h, chroma, dark and 60 or 45),
  }
end

function M.createDynamicPalette(sourceColor, dark)
  local pri = M.createPrimaryVariants(sourceColor, dark)
  local sec = M.createSecondaryVariants(sourceColor, dark)
  local surfaces = M.createSurfaceVariants(sourceColor, dark)
  local text = M.createTextVariants(sourceColor, dark)
  return {
    foreground = text.foreground,
    mutedForeground = text.mutedForeground,
    background = surfaces["1"],
    card = surfaces["2"],
    popover = surfaces["3"],
    hover = surfaces["4"],
    border = M.createBorderColor(sourceColor, dark),
    primary = pri.color,
    primaryForeground = pri.foreground,
    secondary = sec.color,
    secondaryForeground = sec.foreground,
  }
end

return M
