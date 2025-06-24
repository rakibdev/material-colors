Google's Material 3 color tokens are too complex.
This package rethinks colors with a simpler shadcn-like variables and improved tree-shaking over **material-color-utilities**.
Currently I'm using this in a UI library, VS Code theme, and userscript.

## Installation

```
bun add https://github.com/rakibdev/material-colors/releases/latest/download/npm.tgz
```

## Usage

```ts
import { hexToHct, createDynamicPalette } from 'material-colors'

const sourceColor = hexToHct('#ff5722')
const palette = createDynamicPalette(sourceColor, true) // Dark mode

console.log(palette) // MaterialPalette
```

Output

```ts
export type MaterialPalette = {
  foreground: string
  mutedForeground: string

  background: string

  /** Elevated panel */
  card: string

  /** Dialog, dropdown */
  popover: string

  /** Hover, selected */
  hover: string

  /** Input border, divider */
  border: string

  /** Button, link */
  primary: string
  primaryForeground: string

  /** Tonal button, tooltip */
  secondary: string
  secondaryForeground: string
}
```
