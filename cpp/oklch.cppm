export module oklch;

import std;

namespace {

double srgbLinearize(double v) { return v <= 0.04045 ? v / 12.92 : std::pow((v + 0.055) / 1.055, 2.4); }
double srgbDelinearize(double v) { return v <= 0.0031308 ? v * 12.92 : 1.055 * std::pow(v, 1.0 / 2.4) - 0.055; }

std::array<double, 3> linearSrgbToOklab(double r, double g, double b) {
  double l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  double m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  double s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
  double lc = std::cbrt(l), mc = std::cbrt(m), sc = std::cbrt(s);
  return {0.2104542553 * lc + 0.793617785 * mc - 0.0040720468 * sc,
          1.9779984951 * lc - 2.428592205 * mc + 0.4505937099 * sc,
          0.0259040371 * lc + 0.7827717662 * mc - 0.808675766 * sc};
}

std::array<double, 3> oklabToLinearSrgb(double L, double a, double b) {
  double lc = L + 0.3963377774 * a + 0.2158037573 * b;
  double mc = L - 0.1055613458 * a - 0.0638541728 * b;
  double sc = L - 0.0894841775 * a - 1.291485548 * b;
  double l = lc * lc * lc, m = mc * mc * mc, s = sc * sc * sc;
  return { 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
          -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
          -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s};
}

bool inSrgbGamut(double r, double g, double b) {
  const double eps = 1e-4;
  return r >= -eps && r <= 1 + eps && g >= -eps && g <= 1 + eps && b >= -eps && b <= 1 + eps;
}

int linearToChannel(double v) {
  return static_cast<int>(srgbDelinearize(std::clamp(v, 0.0, 1.0)) * 255 + 0.5);
}

}

export struct Rgb { int r, g, b; };
export struct Oklch { double hue, chroma, L; };

export Rgb hexToRgb(const std::string& hex) {
  std::string h = hex[0] == '#' ? hex.substr(1) : hex;
  return {
    (int)std::stoul(h.substr(0, 2), nullptr, 16),
    (int)std::stoul(h.substr(2, 2), nullptr, 16),
    (int)std::stoul(h.substr(4, 2), nullptr, 16)
  };
}

export Oklch rgbToOklch(Rgb rgb) {
  double r = srgbLinearize(rgb.r / 255.0);
  double g = srgbLinearize(rgb.g / 255.0);
  double b = srgbLinearize(rgb.b / 255.0);
  auto [L, a, bv] = linearSrgbToOklab(r, g, b);
  double chroma = std::sqrt(a * a + bv * bv);
  double hue = std::atan2(bv, a) * 180 / std::numbers::pi;
  if (hue < 0) hue += 360;
  return {hue, chroma, L};
}

export Rgb oklchToRgb(double hue, double chroma, double L) {
  double hRad = hue * std::numbers::pi / 180;
  double lo = 0, hi = chroma;
  for (int i = 0; i < 24; i++) {
    double mid = (lo + hi) / 2;
    auto [r, g, b] = oklabToLinearSrgb(L, mid * std::cos(hRad), mid * std::sin(hRad));
    if (inSrgbGamut(r, g, b)) lo = mid; else hi = mid;
  }
  auto [r, g, b] = oklabToLinearSrgb(L, lo * std::cos(hRad), lo * std::sin(hRad));
  return {linearToChannel(r), linearToChannel(g), linearToChannel(b)};
}

export std::string oklchToHex(double hue, double chroma, double L) {
  auto [r, g, b] = oklchToRgb(hue, chroma, L);
  return std::format("#{:02x}{:02x}{:02x}", r, g, b);
}

export Oklch hexToOklch(const std::string& hex) {
  return rgbToOklch(hexToRgb(hex));
}
