local function srgbLinearize(v)
  if v <= 0.04045 then return v / 12.92
  else return ((v + 0.055) / 1.055) ^ 2.4 end
end

local function srgbDelinearize(v)
  if v <= 0.0031308 then return v * 12.92
  else return 1.055 * v ^ (1.0 / 2.4) - 0.055 end
end

local function linearSrgbToOklab(r, g, b)
  local l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
  local m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
  local s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
  local lc = l ^ (1 / 3)
  local mc = m ^ (1 / 3)
  local sc = s ^ (1 / 3)
  return
    0.2104542553 * lc + 0.7936177850 * mc - 0.0040720468 * sc,
    1.9779984951 * lc - 2.4285922050 * mc + 0.4505937099 * sc,
    0.0259040371 * lc + 0.7827717662 * mc - 0.8086757660 * sc
end

local function oklabToLinearSrgb(L, a, b)
  local lc = L + 0.3963377774 * a + 0.2158037573 * b
  local mc = L - 0.1055613458 * a - 0.0638541728 * b
  local sc = L - 0.0894841775 * a - 1.2914855480 * b
  local l = lc * lc * lc
  local m = mc * mc * mc
  local s = sc * sc * sc
  return
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
end

local function inSrgbGamut(r, g, b)
  local eps = 1e-4
  return r >= -eps and r <= 1 + eps and g >= -eps and g <= 1 + eps and b >= -eps and b <= 1 + eps
end

local M = {}

function M.oklchToHex(hue, chroma, L)
  local hRad = hue * math.pi / 180
  local lo, hi = 0.0, chroma
  local r, g, b
  for _ = 1, 24 do
    local mid = (lo + hi) / 2
    r, g, b = oklabToLinearSrgb(L, mid * math.cos(hRad), mid * math.sin(hRad))
    if inSrgbGamut(r, g, b) then lo = mid else hi = mid end
  end
  r, g, b = oklabToLinearSrgb(L, lo * math.cos(hRad), lo * math.sin(hRad))
  return string.format("#%02x%02x%02x",
    math.floor(srgbDelinearize(math.max(0, math.min(1, r))) * 255 + 0.5),
    math.floor(srgbDelinearize(math.max(0, math.min(1, g))) * 255 + 0.5),
    math.floor(srgbDelinearize(math.max(0, math.min(1, b))) * 255 + 0.5)
  )
end

function M.hexToOklch(hex)
  hex = hex:gsub("#", "")
  local r, g, b
  if #hex == 3 then
    r = tonumber(hex:sub(1, 1):rep(2), 16) / 255
    g = tonumber(hex:sub(2, 2):rep(2), 16) / 255
    b = tonumber(hex:sub(3, 3):rep(2), 16) / 255
  elseif #hex == 6 then
    r = tonumber(hex:sub(1, 2), 16) / 255
    g = tonumber(hex:sub(3, 4), 16) / 255
    b = tonumber(hex:sub(5, 6), 16) / 255
  else
    error("unexpected hex " .. hex)
  end
  local L, a, bv = linearSrgbToOklab(srgbLinearize(r), srgbLinearize(g), srgbLinearize(b))
  local chroma = math.sqrt(a * a + bv * bv)
  local hue = math.atan2(bv, a) * 180 / math.pi
  if hue < 0 then hue = hue + 360 end
  return { hue = hue, chroma = chroma, L = L }
end

return M
