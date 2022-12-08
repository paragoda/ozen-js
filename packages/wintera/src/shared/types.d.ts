export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export type Result<T> = [data: T, ok: true] | [data: Error, ok: false]

export type Flag = 'pk' | 'nullable' | 'unique' | 'autoincrement' | 'defaulted'

export type FieldBuildSchema = {
    type: string,
    flags?: Flag[]
    attributes?: {
        [attribut: string]: any // any?
    }
}


export type IntType = 'smallint' | 'int' | 'bigint'
export type NumberType = 'bit' | IntType | 'float' | 'double' | 'decimal'

export type DataTimeType = 'date' | 'time' | 'datetime' | 'timestamp'
export type StringType = 'varchar' | 'text' | 'uuid'

export type SqlType = NumberType | DataTimeType | StringType | 'bool' | 'enum' | 'json'
