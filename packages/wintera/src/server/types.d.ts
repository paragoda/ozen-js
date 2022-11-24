import { TypeBuilder } from './builders/type'
import { Field } from './types/field'

type WinteraServerInit<T extends object> = {
  url: string
  token: string // admin token
  auth: boolean
  tables: {
    [key in keyof T]: Table<T[key]> // change to model
  }
}


/// descride models for database
type Model<T extends object> = {
  [key in keyof T]: TypeBuilder
}


// TODO: define
type Access = any

type AccessInit<T> = (fields: {
  [key in keyof T]: string // just contain name of field, need for comfortable rename and 'typesafe'
}) => Partial<{
  select: Access,
  insert: Access,
  update: Access,
  delete: Access
}>

type TableInit<T extends object> = {
  fields: {
    [key in keyof T]: Field<T[key]>
  }
  access?: AccessInit<T>
}


type Table<T extends object> = {
  fields: {
    [key in keyof T]: Field
  }
  access?: AccessInit<T>
}


export type { Model, Table, Fields, TableInit, WinteraServerInit }