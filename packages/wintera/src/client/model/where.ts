import { json, Result } from '../../shared'
import { Schema } from '../schema'
import { JsOutput, Output, UpdateInput } from './types'

abstract class Where {
  protected condition: any // PLACEHOLDER

  constructor(condition: any) {
    this.condition = condition
  }

  protected async send(body: object): Promise<Result<Response>> {
    try {

      const res = await fetch('/table', {
        method: 'PUT',
        body: json(body)
      })

      return [res, true]
    } catch (err) {
      // track error
      return [new Error('update failed'), false]
    }
  }
}


export class OutputWhere<T extends Schema, Field extends keyof JsOutput<T>> extends Where {

  fields: Field[]

  constructor(condition: any, fields: Field[]) {
    super(condition)
    this.fields = fields
  }

  async update(values: UpdateInput<T>): Promise<Result<Output<T, Field>>> {
    const [data, ok] = await this.send({
      condition: this.condition,
      output: this.fields,
      values
    })

    return ok ? [await data.json(), true] : [data, false]
  }
}

// BAD: almost same code as Where 
export class NoOutputWhere<T extends Schema> extends Where {
  async update(values: UpdateInput<T>): Promise<Error | null> {
    const [data, ok] = await this.send({
      where: this.condition, values
    })

    return ok ? null : data
  }
}