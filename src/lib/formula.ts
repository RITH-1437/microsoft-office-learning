export type Scalar = number | string | boolean | null

export class FormulaError extends Error {
  code: string

  constructor(code: string) {
    super(code)
    this.code = code
  }
}

const ERRORS = {
  div: '#DIV/0!',
  value: '#VALUE!',
  name: '#NAME?',
  ref: '#REF!',
  circ: '#CIRC!',
  num: '#NUM!',
}

export function normalizeRef(ref: string): string {
  return ref.replace(/\$/g, '').toUpperCase()
}

function splitRef(ref: string): { col: number; row: number } {
  const match = /^([A-Z]+)(\d+)$/.exec(normalizeRef(ref))
  if (!match) throw new FormulaError(ERRORS.ref)
  let col = 0
  for (const char of match[1]) col = col * 26 + (char.charCodeAt(0) - 64)
  return { col, row: Number(match[2]) }
}

function colName(col: number): string {
  let name = ''
  let value = col
  while (value > 0) {
    const remainder = (value - 1) % 26
    name = String.fromCharCode(65 + remainder) + name
    value = Math.floor((value - 1) / 26)
  }
  return name
}

type RangeValue = { kind: 'range'; values: Scalar[][] }
type Value = Scalar | RangeValue

type Token =
  | { type: 'number'; value: number }
  | { type: 'string'; value: string }
  | { type: 'cell'; value: string }
  | { type: 'range'; value: { start: string; end: string } }
  | { type: 'func'; value: string }
  | { type: 'name'; value: string }
  | { type: 'op'; value: string }
  | { type: 'lparen' }
  | { type: 'rparen' }
  | { type: 'comma' }
  | { type: 'eof' }

function tokenize(input: string): Token[] {
  const tokens: Token[] = []
  let index = 0

  while (index < input.length) {
    const char = input[index]

    if (/\s/.test(char)) {
      index += 1
      continue
    }

    if (char === '"') {
      let value = ''
      index += 1
      while (index < input.length) {
        if (input[index] === '"') {
          if (input[index + 1] === '"') {
            value += '"'
            index += 2
            continue
          }
          index += 1
          break
        }
        value += input[index]
        index += 1
      }
      tokens.push({ type: 'string', value })
      continue
    }

    const rest = input.slice(index)

    const rangeMatch = /^(\$?[A-Za-z]{1,3}\$?\d+)\s*:\s*(\$?[A-Za-z]{1,3}\$?\d+)/.exec(rest)
    if (rangeMatch) {
      tokens.push({ type: 'range', value: { start: rangeMatch[1], end: rangeMatch[2] } })
      index += rangeMatch[0].length
      continue
    }

    const cellMatch = /^\$?[A-Za-z]{1,3}\$?\d+/.exec(rest)
    if (cellMatch) {
      tokens.push({ type: 'cell', value: cellMatch[0] })
      index += cellMatch[0].length
      continue
    }

    const numberMatch = /^(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?/.exec(rest)
    if (numberMatch) {
      tokens.push({ type: 'number', value: Number(numberMatch[0]) })
      index += numberMatch[0].length
      continue
    }

    const nameMatch = /^[A-Za-z][A-Za-z0-9_.]*/.exec(rest)
    if (nameMatch) {
      const name = nameMatch[0]
      const nextNonSpace = input.slice(index + name.length).match(/^\s*\(/)
      if (nextNonSpace) tokens.push({ type: 'func', value: name.toUpperCase() })
      else tokens.push({ type: 'name', value: name.toUpperCase() })
      index += name.length
      continue
    }

    if (char === '(') {
      tokens.push({ type: 'lparen' })
      index += 1
      continue
    }
    if (char === ')') {
      tokens.push({ type: 'rparen' })
      index += 1
      continue
    }
    if (char === ',') {
      tokens.push({ type: 'comma' })
      index += 1
      continue
    }

    const two = rest.slice(0, 2)
    if (['>=', '<=', '<>'].includes(two)) {
      tokens.push({ type: 'op', value: two })
      index += 2
      continue
    }
    if ('+-*/^&=<>'.includes(char)) {
      tokens.push({ type: 'op', value: char })
      index += 1
      continue
    }

    throw new FormulaError(ERRORS.value)
  }

  tokens.push({ type: 'eof' })
  return tokens
}

function isNumeric(value: Scalar): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function toNumber(value: Scalar): number {
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new FormulaError(ERRORS.num)
    return value
  }
  if (typeof value === 'boolean') return value ? 1 : 0
  if (value === null) return 0
  if (typeof value === 'string' && value.startsWith('#')) throw new FormulaError(value)
  if (value !== null && String(value).trim() === '') return 0
  const number = Number(value)
  if (!Number.isFinite(number)) throw new FormulaError(ERRORS.value)
  return number
}

function toText(value: Scalar): string {
  if (value === null) return ''
  if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE'
  return String(value)
}

function isRange(value: Value): value is RangeValue {
  return typeof value === 'object' && value !== null && 'kind' in value && value.kind === 'range'
}

function flatten(args: Value[]): Scalar[] {
  const values: Scalar[] = []
  for (const arg of args) {
    if (isRange(arg)) {
      for (const row of arg.values) for (const cell of row) values.push(cell)
    } else {
      values.push(arg)
    }
  }
  return values
}

function numericValues(args: Value[]): number[] {
  return flatten(args).filter(isNumeric)
}

function truthy(value: Scalar): boolean {
  if (value === null) return false
  if (typeof value === 'boolean') return value
  if (typeof value === 'number') return value !== 0
  if (value.toUpperCase() === 'FALSE') return false
  return value !== ''
}

function looseEqual(left: Scalar, right: Scalar): boolean {
  if (isNumeric(left) && isNumeric(right)) return left === right
  if (typeof left === 'boolean' || typeof right === 'boolean') {
    const leftBool = typeof left === 'boolean' ? left : truthy(left)
    const rightBool = typeof right === 'boolean' ? right : truthy(right)
    return leftBool === rightBool
  }
  return toText(left).toLowerCase() === toText(right).toLowerCase()
}

function compareValues(left: Scalar, right: Scalar, operator: string): boolean {
  if (operator === '=') return looseEqual(left, right)
  if (operator === '<>') return !looseEqual(left, right)

  let comparison: number
  if (isNumeric(left) && isNumeric(right)) {
    comparison = left - right
  } else {
    comparison = toText(left).toLowerCase().localeCompare(toText(right).toLowerCase())
  }
  if (operator === '>') return comparison > 0
  if (operator === '<') return comparison < 0
  if (operator === '>=') return comparison >= 0
  if (operator === '<=') return comparison <= 0
  throw new FormulaError(ERRORS.value)
}

function wildcardRegex(pattern: string): RegExp {
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.')
  return new RegExp(`^${escaped}$`, 'i')
}

function makeCriterion(criterion: Scalar): (value: Scalar) => boolean {
  if (criterion === null) return (value) => value === null
  if (typeof criterion === 'number' || typeof criterion === 'boolean') {
    return (value) => looseEqual(value, criterion)
  }

  const text = String(criterion)
  const match = /^(>=|<=|<>|>|<|=)?(.*)$/.exec(text)
  if (!match) return (value) => looseEqual(value, criterion)
  const operator = match[1] ?? ''
  const operand = match[2].trim()

  if (operator) {
    const numeric = /^-?\d+(\.\d+)?$/.test(operand) ? Number(operand) : null
    return (value) => {
      if (numeric !== null) {
        if (!isNumeric(value)) return operator === '<>'
        return compareValues(value, numeric, operator)
      }
      return compareValues(value, operand, operator)
    }
  }

  if (operand.includes('*') || operand.includes('?')) {
    const regex = wildcardRegex(operand)
    return (value) => regex.test(toText(value))
  }

  if (/^-?\d+(\.\d+)?$/.test(operand)) {
    const numeric = Number(operand)
    return (value) => looseEqual(value, numeric)
  }

  return (value) => looseEqual(value, operand)
}

class Parser {
  private tokens: Token[]
  private position = 0
  private evaluator: WorksheetEvaluator

  constructor(input: string, evaluator: WorksheetEvaluator) {
    this.tokens = tokenize(input)
    this.evaluator = evaluator
  }

  parse(): Scalar {
    const value = this.parseComparison()
    if (this.peek().type !== 'eof') throw new FormulaError(ERRORS.value)
    if (isRange(value)) throw new FormulaError(ERRORS.value)
    return value
  }

  private peek(): Token {
    return this.tokens[this.position]
  }

  private consume(): Token {
    return this.tokens[this.position++]
  }

  private expect(type: Token['type']): Token {
    const token = this.consume()
    if (token.type !== type) throw new FormulaError(ERRORS.value)
    return token
  }

  private parseComparison(): Value {
    let left = this.parseAdditive()
    while (this.peek().type === 'op') {
      const operator = (this.peek() as { type: 'op'; value: string }).value
      if (!['=', '<>', '<', '>', '<=', '>='].includes(operator)) break
      this.consume()
      const right = this.parseAdditive()
      if (isRange(left) || isRange(right)) throw new FormulaError(ERRORS.value)
      left = compareValues(left, right, operator)
    }
    return left
  }

  private parseAdditive(): Value {
    let left = this.parseTerm()
    while (this.peek().type === 'op') {
      const operator = (this.peek() as { type: 'op'; value: string }).value
      if (operator !== '+' && operator !== '-') break
      this.consume()
      const right = this.parseTerm()
      if (isRange(left) || isRange(right)) throw new FormulaError(ERRORS.value)
      left = operator === '+' ? toNumber(left) + toNumber(right) : toNumber(left) - toNumber(right)
    }
    return left
  }

  private parseTerm(): Value {
    let left = this.parsePower()
    while (this.peek().type === 'op') {
      const operator = (this.peek() as { type: 'op'; value: string }).value
      if (operator !== '*' && operator !== '/') break
      this.consume()
      const right = this.parsePower()
      if (isRange(left) || isRange(right)) throw new FormulaError(ERRORS.value)
      if (operator === '/') {
        const divisor = toNumber(right)
        if (divisor === 0) throw new FormulaError(ERRORS.div)
        left = toNumber(left) / divisor
      } else {
        left = toNumber(left) * toNumber(right)
      }
    }
    return left
  }

  private parsePower(): Value {
    let left = this.parseUnary()
    while (this.peek().type === 'op' && (this.peek() as { type: 'op'; value: string }).value === '^') {
      this.consume()
      const right = this.parseUnary()
      if (isRange(left) || isRange(right)) throw new FormulaError(ERRORS.value)
      left = toNumber(left) ** toNumber(right)
    }
    return left
  }

  private parseUnary(): Value {
    if (this.peek().type === 'op') {
      const operator = (this.peek() as { type: 'op'; value: string }).value
      if (operator === '-' || operator === '+') {
        this.consume()
        const value = this.parseUnary()
        if (isRange(value)) throw new FormulaError(ERRORS.value)
        return operator === '-' ? -toNumber(value) : toNumber(value)
      }
    }
    return this.parsePrimary()
  }

  private parsePrimary(): Value {
    const token = this.consume()
    switch (token.type) {
      case 'number':
        return token.value
      case 'string':
        return token.value
      case 'cell':
        return this.evaluator.getCell(token.value)
      case 'range':
        return this.evaluator.getRange(token.value.start, token.value.end)
      case 'name':
        if (token.value === 'TRUE') return true
        if (token.value === 'FALSE') return false
        throw new FormulaError(ERRORS.name)
      case 'func':
        return this.parseFunction(token.value)
      case 'lparen': {
        const value = this.parseComparison()
        this.expect('rparen')
        return value
      }
      default:
        throw new FormulaError(ERRORS.value)
    }
  }

  private parseFunction(name: string): Value {
    this.expect('lparen')
    const args: Value[] = []
    if (this.peek().type !== 'rparen') {
      while (true) {
        args.push(this.parseComparison())
        if (this.peek().type === 'comma') {
          this.consume()
          continue
        }
        break
      }
    }
    this.expect('rparen')
    return applyFunction(name, args)
  }
}

function applyFunction(name: string, args: Value[]): Scalar {
  switch (name) {
    case 'SUM':
      return numericValues(args).reduce((total, value) => total + value, 0)
    case 'AVERAGE': {
      const numbers = numericValues(args)
      if (numbers.length === 0) throw new FormulaError(ERRORS.div)
      return numbers.reduce((total, value) => total + value, 0) / numbers.length
    }
    case 'MIN': {
      const numbers = numericValues(args)
      return numbers.length ? Math.min(...numbers) : 0
    }
    case 'MAX': {
      const numbers = numericValues(args)
      return numbers.length ? Math.max(...numbers) : 0
    }
    case 'COUNT':
      return numericValues(args).length
    case 'COUNTA':
      return flatten(args).filter((value) => value !== null).length
    case 'ROUND': {
      if (args.length < 1) throw new FormulaError(ERRORS.value)
      const value = args[0]
      const digits = args.length > 1 ? toNumber(args[1] as Scalar) : 0
      if (isRange(value)) throw new FormulaError(ERRORS.value)
      const factor = 10 ** Math.trunc(digits)
      return Math.round(toNumber(value) * factor) / factor
    }
    case 'IF': {
      if (args.length < 2) throw new FormulaError(ERRORS.value)
      const test = args[0]
      if (isRange(test)) throw new FormulaError(ERRORS.value)
      const branch = truthy(test) ? args[1] : args.length > 2 ? args[2] : null
      if (branch === null) return null
      if (isRange(branch)) throw new FormulaError(ERRORS.value)
      return branch
    }
    case 'COUNTIF': {
      if (args.length < 2) throw new FormulaError(ERRORS.value)
      const range = args[0]
      const criterion = args[1]
      if (!isRange(range) || isRange(criterion)) throw new FormulaError(ERRORS.value)
      const test = makeCriterion(criterion)
      return flatten([range]).filter(test).length
    }
    case 'SUMIF': {
      if (args.length < 2) throw new FormulaError(ERRORS.value)
      const range = args[0]
      const criterion = args[1]
      if (!isRange(range) || isRange(criterion)) throw new FormulaError(ERRORS.value)
      const test = makeCriterion(criterion)
      const sumRange = args.length > 2 ? args[2] : range
      if (!isRange(sumRange)) throw new FormulaError(ERRORS.value)
      const source = flatten([range])
      const targets = flatten([sumRange])
      let total = 0
      source.forEach((value, index) => {
        if (!test(value)) return
        const target = targets[index]
        if (isNumeric(target)) total += target
      })
      return total
    }
    case 'VLOOKUP': {
      if (args.length < 3) throw new FormulaError(ERRORS.value)
      const lookup = args[0]
      const table = args[1]
      const column = args[2]
      if (isRange(lookup) || !isRange(table) || isRange(column)) throw new FormulaError(ERRORS.value)
      const columnIndex = Math.trunc(toNumber(column))
      if (columnIndex < 1) throw new FormulaError(ERRORS.ref)
      const approximate = args.length > 3 && !isRange(args[3]) ? truthy(args[3]) : false
      let chosen: Scalar[] | undefined
      for (const row of table.values) {
        if (row.length < columnIndex) continue
        if (!approximate) {
          if (looseEqual(row[0], lookup)) {
            chosen = row
            break
          }
        } else if (isNumeric(row[0]) && isNumeric(lookup) && row[0] <= lookup) {
          chosen = row
        }
      }
      if (!chosen) throw new FormulaError(ERRORS.ref)
      return chosen[columnIndex - 1] ?? null
    }
    case 'TODAY':
      return new Date().toLocaleDateString()
    default:
      throw new FormulaError(ERRORS.name)
  }
}

export class WorksheetEvaluator {
  private cells: Record<string, string>
  private cache = new Map<string, Scalar>()
  private visiting = new Set<string>()

  constructor(cells: Record<string, string>) {
    this.cells = cells
  }

  getCell(ref: string): Scalar {
    const normalized = normalizeRef(ref)
    if (this.cache.has(normalized)) return this.cache.get(normalized) ?? null
    if (this.visiting.has(normalized)) throw new FormulaError(ERRORS.circ)

    const { row, col } = splitRef(normalized)
    if (row < 1 || col < 1 || row > 10000 || col > 16384) throw new FormulaError(ERRORS.ref)

    const raw = this.cells[normalized] ?? ''
    if (raw.trim() === '') {
      this.cache.set(normalized, null)
      return null
    }

    if (raw.trim().startsWith('=')) {
      this.visiting.add(normalized)
      try {
        const parser = new Parser(raw.trim().slice(1), this)
        const value = parser.parse()
        this.cache.set(normalized, value)
        return value
      } catch (error) {
        const code = error instanceof FormulaError ? error.code : ERRORS.value
        this.cache.set(normalized, code)
        return code
      } finally {
        this.visiting.delete(normalized)
      }
    }

    const trimmed = raw.trim()
    if (/^-?\d+(\.\d+)?%$/.test(trimmed)) {
      const value = Number(trimmed.slice(0, -1)) / 100
      this.cache.set(normalized, value)
      return value
    }
    if (/^-?\d+(\.\d*)?([eE][+-]?\d+)?$/.test(trimmed) || /^-?\.\d+$/.test(trimmed)) {
      const value = Number(trimmed)
      this.cache.set(normalized, value)
      return value
    }
    this.cache.set(normalized, raw)
    return raw
  }

  getRange(start: string, end: string): RangeValue {
    const a = splitRef(start)
    const b = splitRef(end)
    const minRow = Math.min(a.row, b.row)
    const maxRow = Math.max(a.row, b.row)
    const minCol = Math.min(a.col, b.col)
    const maxCol = Math.max(a.col, b.col)

    if (maxRow - minRow > 1000 || maxCol - minCol > 100) throw new FormulaError(ERRORS.ref)

    const values: Scalar[][] = []
    for (let row = minRow; row <= maxRow; row += 1) {
      const line: Scalar[] = []
      for (let col = minCol; col <= maxCol; col += 1) {
        line.push(this.getCell(`${colName(col)}${row}`))
      }
      values.push(line)
    }
    return { kind: 'range', values }
  }
}

export function displayValue(value: Scalar): string {
  if (value === null) return ''
  if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE'
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) return ERRORS.num
    if (Number.isInteger(value)) return String(value)
    return String(Math.round(value * 10000) / 10000)
  }
  return value
}

export function evaluateWorkbook(cells: Record<string, string>): WorksheetEvaluator {
  return new WorksheetEvaluator(cells)
}

export function cellAddress(col: number, row: number): string {
  return `${colName(col)}${row}`
}

export function parseAddress(ref: string): { col: number; row: number } {
  return splitRef(ref)
}
