import fs from 'node:fs'
import path from 'node:path'

const appPath = path.resolve('src/App.jsx')
if (!fs.existsSync(appPath)) {
  console.error('Nie znaleziono src/App.jsx. Uruchom skrypt w głównym katalogu projektu.')
  process.exit(1)
}

let source = fs.readFileSync(appPath, 'utf8')
const backupPath = `${appPath}.bak-v45`
if (!fs.existsSync(backupPath)) fs.writeFileSync(backupPath, source)

const importLine = "import { SampleMapV45 } from './components/SampleMapV45.jsx'"
if (!source.includes(importLine)) {
  const importMatches = [...source.matchAll(/^import .*$/gm)]
  if (!importMatches.length) throw new Error('Nie znaleziono sekcji importów w src/App.jsx.')
  const last = importMatches.at(-1)
  const insertAt = last.index + last[0].length
  source = source.slice(0, insertAt) + `\n${importLine}` + source.slice(insertAt)
}

const start = source.indexOf('function SampleMap()')
if (start === -1) throw new Error('Nie znaleziono funkcji SampleMap() w src/App.jsx.')

const braceStart = source.indexOf('{', start)
if (braceStart === -1) throw new Error('Nie znaleziono początku funkcji SampleMap().')

let depth = 0
let end = -1
let inSingle = false
let inDouble = false
let inTemplate = false
let escaped = false

for (let i = braceStart; i < source.length; i++) {
  const ch = source[i]
  if (escaped) { escaped = false; continue }
  if (ch === '\\') { escaped = true; continue }
  if (!inDouble && !inTemplate && ch === "'") { inSingle = !inSingle; continue }
  if (!inSingle && !inTemplate && ch === '"') { inDouble = !inDouble; continue }
  if (!inSingle && !inDouble && ch === '`') { inTemplate = !inTemplate; continue }
  if (inSingle || inDouble || inTemplate) continue
  if (ch === '{') depth++
  if (ch === '}') {
    depth--
    if (depth === 0) { end = i + 1; break }
  }
}

if (end === -1) throw new Error('Nie udało się znaleźć końca funkcji SampleMap().')

const replacement = `function SampleMap() {\n  return <SampleMapV45 />\n}`
source = source.slice(0, start) + replacement + source.slice(end)
fs.writeFileSync(appPath, source)
console.log('Gotowe: zmieniono wyłącznie funkcję SampleMap() i dodano import SampleMapV45.')
console.log(`Kopia bezpieczeństwa: ${path.relative(process.cwd(), backupPath)}`)
