import { Result } from '../types'

type ModelSchema = {
    [key: string]: any
}

type ConditionBuilder<T extends ModelSchema> = (fields: T) => any

class Output<T extends ModelSchema, FieldName extends keyof T> {
    // fields: T[keyof T][]
    fields: FieldName[]

    update(values: Partial<T>) {

    }

    constructor(fields: FieldName[]) {
        this.fields = fields
    }

    insert(values: Partial<T>): Promise<Result<{ [key in typeof this.fields[number]]: T[key] }>>
    insert(values: Partial<T>[]): Promise<Result<{ [key in typeof this.fields[number]]: T[key] }[]>>

    // It works wow!!!
    async insert(values: Partial<T> | Partial<T>[]): Promise<Result<Pick<T, FieldName> | Pick<T, FieldName>[]>> {
        try {
            const data = await fetch('/table', {
                method: 'POST',
                body: JSON.stringify({
                    output: this.fields,
                    values
                })
            })

            const json = await data.json()
            return [json, true]

        } catch (error) {
            return [new Error('insert failed'), false]
        }
    }
}

type ModelFields<T extends ModelSchema> = {
    [key in keyof T]: key
}

function c<T extends string>(a: T[]) {
    return a;
}

class Model<T extends ModelSchema> {
    readonly schema: T

    constructor(schema: T) {
        this.schema = schema
    }

    /*
        Return only is insert was okey or not
    */
    async insert(values: Partial<T> | Partial<T>[]): Promise<boolean> {
        return true
    }

    update() {

    }

    async delete(condition: ConditionBuilder<T>): Promise<boolean> {
        return true
    }

    // just placeholder for now

    output<FieldName extends keyof T>(build: (fields: ModelFields<T>) => FieldName[] | typeof fields) {
        const fields = build(this.schema)
        // Object.values works with arrays also
        return new Output<T, FieldName>(Object.values(fields))
    }

    // not sure should we add it
    upsert() { }
}

function model<T extends ModelSchema>(schema: T) {
    return new Model(schema)
}

export { Model, model }