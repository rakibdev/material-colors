export module hct_oklch;

import std;
import oklch;

namespace {

constexpr double K1 = 0.173;
constexpr double K2 = 0.004;
constexpr double K3 = (1.0 + K1) / (1.0 + K2);

double toneToL(double tone) {
  double x = tone / 100;
  return (x * x + K1 * x) / (K3 * (x + K2));
}

double lToTone(double L) {
  return 100 * (K3 * L - K1 + std::sqrt(std::pow(K3 * L - K1, 2) + 4 * K2 * K3 * L)) / (2 * K3);
}

constexpr double CHROMA_RATIO = 379;

}

export std::string hctToHex(double hue, double chroma, double tone) {
  return oklchToHex(hue, chroma / CHROMA_RATIO, toneToL(tone));
}

export struct Hct { double hue, chroma, tone; };

export Hct hexToHct(const std::string& hex) {
  auto [hue, chroma, L] = hexToOklch(hex);
  return {hue, chroma * CHROMA_RATIO, lToTone(L)};
}
