

type IntType = 'smallint' | 'int' | 'bigint'
type NumberType = 'bit' | IntType | 'float' | 'double' | 'decimal'
type INumberField = {
  type: NumberType
}

type DataTimeType = 'date' | 'time' | 'datetime' | 'timestamp'
type StringType = 'varchar' | 'text' | 'uuid'

type IStringField = {
  type: StringType | DataTimeType
}

// T extends boolean
type IBooleanField = {
  type: 'bool'
}

type IObjectField = {
  type: 'json'
}

type SqlType = NumberType | DataTimeType | StringType | 'bool' | 'enum' | 'json'


type FieldAttributes = {
  pk: boolean
  optional: boolean
  unique: boolean
}

/*
  T = basic type of field on frontend
*/
type Field<T> =
  T extends string ? IStringField :
  T extends object ? IObjectField :
  T extends number ? INumberField :
  T extends boolean ? IBooleanField :
  never

export { IntType, StringType, DataTimeType, NumberType, SqlType }
export { Field, IStringField, IBooleanField, IObjectField, INumberField }