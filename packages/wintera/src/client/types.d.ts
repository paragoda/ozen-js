/*
type SelectMethod = 'SELECT' | 'select'
type FromMethod = 'FROM' | 'from'
type InsertMethod = 'INSERT' | 'insert'
type UpdateMethod = 'UPDATE' | 'update'
type DeleteMethod = 'DELETE' | 'delete'

type SqlMethod = SelectMethod | InsertMethod | UpdateMethod | DeleteMethod

type SpaceOrEnd = '\n' | ' '

type SpaceOrNothing = `${string} ` | ''

type SelectSql = `${SpaceOrNothing}${SelectMethod}${SpaceOrEnd}${string}${SpaceOrEnd}${FromMethod}${SpaceOrEnd}${string}`
type InsertSql = `${SpaceOrNothing}${InsertMethod} ${string}`
type UpdateSql = `${SpaceOrNothing}${UpdateMethod} ${string}`
type DeleteSql = `${SpaceOrNothing}${DeleteMethod} ${string}`

type SqlQuery = SelectSql | InsertSql | UpdateSql | DeleteSql

export { HttpMethod, SqlMethod, SqlQuery }
export { SelectMethod, InsertMethod, UpdateMethod, DeleteMethod }
export { SelectSql, DeleteSql, UpdateSql, InsertSql }
*/