local K1 = 0.173
local K2 = 0.004
local K3 = (1.0 + K1) / (1.0 + K2)

local function toneToL(tone)
  local x = tone / 100
  return (x * x + K1 * x) / (K3 * (x + K2))
end

local function lToTone(L)
  return 100 * (K3 * L - K1 + math.sqrt((K3 * L - K1) ^ 2 + 4 * K2 * K3 * L)) / (2 * K3)
end

local CHROMA_RATIO = 379

local oklch = require("oklch")

local function hctToOklchChroma(hctChroma)
  return hctChroma / CHROMA_RATIO
end

local M = {}

function M.hctToHex(hue, chroma, tone)
  return oklch.oklchToHex(hue, hctToOklchChroma(chroma), toneToL(tone))
end

function M.hexToHct(hex)
  local color = oklch.hexToOklch(hex)
  return { hue = color.hue, chroma = color.chroma * CHROMA_RATIO, tone = lToTone(color.L) }
end

return M
