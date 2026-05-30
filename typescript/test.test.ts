import { test, expect } from 'bun:test'
import { hexToHct, createDynamicPalette } from './main.ts'

test('#00639b input color matches original HCT primary in dark mode', () => {
  const { primary } = createDynamicPalette(hexToHct('#00639b'), true)
  expect(primary).toBe('#92ceff')
})
