import { json } from '../../shared';
import { Schema } from '../schema';
import { OutputRequest } from './output';
import { ConditionSchema, Insert, JsOutput, ModelFields, UpdateInput } from './types';
import { NoOutputWhere } from './where';

class Model<T extends Schema> {
  readonly schema: T

  constructor(schema: T) { this.schema = schema }

  /*
    Return only is insert was okey or not
  */
  // overloads for beauty
  insert(values: Insert<T>): Promise<Error | null>
  insert(values: Insert<T>[]): Promise<Error | null>

  async insert(values: Insert<T> | Insert<T>[]): Promise<Error | null> {
    try {
      await fetch('/table', {
        method: 'POST',
        body: json(values)
      })
      return null
    } catch {
      return new Error('insert without output failed')
    }
  }

  // async update<FieldName extends keyof T>(
  //     value: Partial<T>,
  //     condition: ConditionBuilder<T>,
  //     build: (fields: ModelFields<T>) => FieldName[] | typeof fields = () => []
  // ): Promise<boolean> {
  //     return true
  // }

  async delete(condition: (cs: ConditionSchema<T>) => any): Promise<Error | null> {
    try {
      const cb: any = {} // PLACEHOLDER
      const where = condition(cb)
      await fetch(`/table?where=${where}`, { method: 'DELETE' })
      return null
    } catch (error) {
      return new Error('delete failed')
    }
  }

  where(condition: ConditionBuilder<T>) {
    const cb: any = {} // placeholder
    return new NoOutputWhere<T>(condition(cb))
  }
  // just placeholder for now

  output<Field extends keyof JsOutput<T>>(build:
    (fields: ModelFields<T>) => Field[] | typeof fields
  ) {
    // generate object where values are keys
    const fieldNames = {}
    for (let key in Object.keys(this.schema)) {
      Object.defineProperty(fieldNames, key, key)
    }
    const fields = build(fieldNames as ModelFields<T>)

    return new OutputRequest<T, Field>(Object.values(fields))
  }
}

function model<T extends Schema>(schema: T) { return new Model(schema) }

export { Model, model }