const avg = (col: string) => `AVG(${col})`
const count = (col: string = '*') => `COUNT(${col})`
const max = (col: string) => `MAX(${col})`
const min = (col: string) => `MIN(${col})`


class Col {

}

const col = (name: 'string') => new Col()

const and = (a: string, b: string) => `(${a} AND ${b})`
const or = (a: string, b: string) => `(${a} OR ${b})`

export { avg, count, max, min }
export { and, or }
export { col }