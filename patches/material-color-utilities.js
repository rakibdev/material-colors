import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

const module = join(process.cwd(), 'node_modules/@material/material-color-utilities')
const packageJson = JSON.parse(await readFile(join(module, 'package.json'), 'utf8'))
packageJson.exports = {
  ...packageJson.exports,
  // For better tree-shaking.
  './hct': {
    types: './hct/hct.d.ts',
    import: './hct/hct.js'
  },
  './utils/*': {
    types: './utils/*.d.ts',
    import: './utils/*.js'
  }
}
await writeFile(`${module}/package.json`, JSON.stringify(packageJson, null, 2))
