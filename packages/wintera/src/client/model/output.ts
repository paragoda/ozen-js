import { Schema } from '../schema'
import { OutputWhere } from './where'
import { json, Result } from '../../shared'
import { Insert, JsOutput, Output } from './types'


export class OutputRequest<T extends Schema, FieldName extends keyof JsOutput<T>> {

  fields: FieldName[]

  where(condition: ConditionBuilder<T>) {
    const cb: any = {} // placeholder
    return new OutputWhere<T, FieldName>(condition(cb), this.fields)
  }

  constructor(fields: FieldName[]) {
    this.fields = fields
  }

  insert(values: Insert<T>): Promise<Result<Output<T, FieldName>>> // how to make it shorter
  insert(values: Insert<T>[]): Promise<Result<Output<T, FieldName>[]>>

  // It works wow!!!
  async insert(values: Insert<T> | Insert<T>[]): Promise<Result<
    Output<T, FieldName> | Output<T, FieldName>[]
  >> {
    try {
      const data = await fetch('/table', {
        method: 'POST',
        body: json({ output: this.fields, values })
      })

      const output = await data.json()
      return [output, true]

    } catch (error) {
      return [new Error('insert failed'), false]
    }
  }
}