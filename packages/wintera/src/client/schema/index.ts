import W from './w'

/*

Module for building schemas of tables

REQUIREMENTS:
- minimal as possible on client
- extendable on server
- required by default

Look at zod

*/

const w = new W()
export { w }

export * from './types'
export * from './base'
export * from './flags'