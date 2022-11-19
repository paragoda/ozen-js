import { TypeBuilder } from './builders/TypeBuilders'


/// descride models for database
type Model<T extends object> = {
  [key in keyof T]: TypeBuilder
}

type Table<T extends object> = {
  name: string
  model: Model<T>
}

export type { Model, Table, }