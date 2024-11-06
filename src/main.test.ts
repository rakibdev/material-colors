import { expect, test } from 'bun:test'
import { inverseTone } from './main'

test('inverse tone', () => {
  expect(inverseTone(95)).toBe(13)
})
