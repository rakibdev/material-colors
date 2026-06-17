export module material;

import std;
import hct_oklch;

export namespace MaterialColors {

const std::string primary = "#00bfff";
const std::string error = "#ff0062";

Hct hexToHct(const std::string& hex) { return ::hexToHct(hex); }

double getNeutralChroma() { return 2.0; }

struct Variants { std::string color, foreground; };

Variants createPrimaryVariants(const Hct& src, bool dark = false) {
  double chroma = 40;
  return {hctToHex(src.hue, chroma, dark ? 80 : 40),
          hctToHex(src.hue, chroma, dark ? 20 : 98)};
}

Variants createSecondaryVariants(const Hct& src, bool dark = false, double chroma = 0) {
  if (chroma == 0) chroma = dark ? 26.0 : 32.0;
  return {hctToHex(src.hue, chroma, dark ? 30 : 80),
          hctToHex(src.hue, chroma, dark ? 80 : 20)};
}

std::string createBorderColor(const Hct& src, bool dark = false) {
  return hctToHex(src.hue, getNeutralChroma(), dark ? 20 : 80);
}

struct Surfaces { std::string s1, s2, s3, s4; };

Surfaces createSurfaceVariants(const Hct& src, bool dark = false, double chroma = 0) {
  if (chroma == 0) chroma = getNeutralChroma();
  auto tones = dark ? std::array{8.0, 12.0, 13.0, 15.0} : std::array{99.0, 95.0, 94.0, 92.0};
  return {hctToHex(src.hue, chroma,       tones[0]),
          hctToHex(src.hue, chroma * 1.2, tones[1]),
          hctToHex(src.hue, chroma * 1.3, tones[2]),
          hctToHex(src.hue, chroma * 1.4, tones[3])};
}

struct TextVariants { std::string foreground, mutedForeground; };

TextVariants createTextVariants(const Hct& src, bool dark = false) {
  double chroma = getNeutralChroma();
  return {hctToHex(src.hue, chroma, dark ? 85 : 15),
          hctToHex(src.hue, chroma, dark ? 60 : 45)};
}

struct DynamicPalette {
  std::string foreground, mutedForeground;
  std::string background, card, popover, hover;
  std::string border;
  std::string primary, primaryForeground;
  std::string secondary, secondaryForeground;
};

DynamicPalette createDynamicPalette(const Hct& src, bool dark = false) {
  auto pri = createPrimaryVariants(src, dark);
  auto sec = createSecondaryVariants(src, dark);
  auto sur = createSurfaceVariants(src, dark);
  auto txt = createTextVariants(src, dark);
  return {
    .foreground = txt.foreground,
    .mutedForeground = txt.mutedForeground,
    .background = sur.s1,
    .card = sur.s2,
    .popover = sur.s3,
    .hover = sur.s4,
    .border = createBorderColor(src, dark),
    .primary = pri.color,
    .primaryForeground = pri.foreground,
    .secondary = sec.color,
    .secondaryForeground = sec.foreground
  };
}

}
