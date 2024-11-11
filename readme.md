I found Google's Material 3 color token specification complex. So I created a simplified version. And this package have better tree-shaking than **material-color-utilities**. Currently I'm using this in a UI library, a VS Code theme, and a userscript.

## Installation

```
bun add https://github.com/rakibdev/material-colors/releases/download/1.0.0/material-colors.tgz
```

## Usage

```ts
import * as materialColors from 'material-colors'

// Tone is lightness.
// Higher means lighter but in dark mode higher is darker.
const tones = [20, 40, 80] as const
const colors = materialColors.generate({
  tones,
  darkMode: true,
  colors: { primary: '#HEX', error: '#HEX' }
})

// TypeScript autocomplete is available on colors.
console.log(materialColors.flatten(colors))
```

Output

```json
{
  "--primary-20": "#ffd1dd", // Body foreground.
  "--primary-40": "#dd90a8", // Tone 40 is real color.
  "--primary-80": "#6a2f44",
  "--primary-surface": "#1f1518", // Body background.
  "--primary-surface-2": "#321e24", // Elevated container background e.g. dialog.
  "--primary-surface-3": "#442831", // Button background.
  "--primary-surface-4": "#50303a", // Button background inside elevated containers.
  "--error-20": "#ffd3cd",
  "--error-40": "#ff8071",
  "--error-80": "#8a0005",
  "--error-surface": "#201513",
  "--error-surface-2": "#341e1b",
  "--error-surface-3": "#462824",
  "--error-surface-4": "#52302b",
  "--neutral-20": "#ecd8dc",
  "--neutral-40": "#b4a1a5",
  "--neutral-80": "#4c3f42"
}
```
