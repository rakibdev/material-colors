HCT (used by Material You) is computationally expensive and not natively supported in browsers.
I used OKLCH to produce visually equivalent colors.<br>
And I find Material 3 color tokens overwhelming. This uses way fewer tokens similar to shadcn.<br>
I'm using this in a UI library, neovim/vscode themes, and userscripts.

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
