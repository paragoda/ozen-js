import { JsType, Schema, ClientFieid, Defaulted, FlagField, Nullable } from '../schema'

export type ModelFields<T extends Schema> = {
  [key in keyof T]: key
}

// Just all optional
export type UpdateInput<T extends Schema> = {
  [key in keyof T]?: JsType<T[key]>
}

export type Output<T extends Schema, Fields extends keyof JsOutput<T>> = Pick<JsOutput<T>, Fields>

// OUTPUT same for insert, update, select
type NullableKeys<T> = {
  [key in keyof T]-?: Extract<T[key], Nullable<ClientFieid>> extends never ? never : key
}[keyof T]
type OptionalOutput<T extends Schema> = { [p in NullableKeys<T>]: null | JsType<T[p]> }

// get not flag fields
type NoNullableFields<T> = {
  [p in keyof T]-?: Extract<T[p], ClientFieid | Defaulted<ClientFieid>> extends never ? never : p
}[keyof T]
/**
* Extract not flagged
*/
type RequiredOutput<T extends Schema> = { [p in NoNullableFields<T>]-?: JsType<T[p]> }

export type JsOutput<T extends Schema> = RequiredOutput<T> & OptionalOutput<T>




// INSERT

// get keys of class FlaggedField
type FlagKeys<T> = {
  [key in keyof T]-?: Extract<T[key], FlagField<ClientFieid>> extends never ? never : key
}[keyof T]
type OptionalInsert<T extends Schema> = { [p in FlagKeys<T>]?: JsType<T[p]> }

// get not flag fields
type NoFlagFields<T> = {
  [p in keyof T]-?: Extract<T[p], ClientFieid> extends never ? never : p
}[keyof T]
/**
* Extract not flagged
*/
type RequiredInsert<T extends Schema> = { [p in NoFlagFields<T>]-?: JsType<T[p]> }

export type Insert<T extends Schema> = OptionalInsert<T> & RequiredInsert<T>


// CONDITION


export type ConditionSchema<T extends Schema> = {
  [key in keyof T]: any
}