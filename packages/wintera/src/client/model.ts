import { Result } from '../shared/types'

type ModelSchema = {
    [key: string]: any
}

function json(data: any): string {
    return JSON.stringify(data)
}

type ConditionBuilder<T extends ModelSchema> = (fields: T) => any

class Where<T extends ModelSchema, FieldName extends keyof T> {

    private condition: any // placeholder
    fields: FieldName[]

    constructor(condition: any, fields: FieldName[]) {
        this.condition = condition
        this.fields = fields
    }

    async update(values: Partial<T>): Promise<Result<{ [key in typeof this.fields[number]]: T[key] }>

    > {
        try {
            const data = await fetch('/table', {
                method: 'PATCH', // not sure
                body: JSON.stringify({
                    where: this.condition,
                    output: this.fields,
                    values
                })
            })

            const json = await data.json()
            return [json, true]

        } catch (error) {
            return [new Error('update failed'), false]
        }
    }
}

class Output<T extends ModelSchema, FieldName extends keyof T> {
    // fields: T[keyof T][]
    fields: FieldName[]

    where(condition: ConditionBuilder<T>) {
        const cb: any = {} // placeholder
        return new Where<T, FieldName>(condition(cb), this.fields)
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

// BAD: almost same code as Where 
class NoOutputWhere<T extends ModelSchema> {

    private condition: any // placeholder

    constructor(condition: any) {
        this.condition = condition
    }

    async update(values: Partial<T>): Promise<Error | null> {
        try {
            await fetch('/table', {
                method: 'PATCH', // not sure
                body: JSON.stringify({
                    where: this.condition, values
                })
            })

            return null
        } catch (error) {
            // do we need error? - yes
            // remake exception free
            return new Error('update without output failed')
        }
    }
}

class Model<T extends ModelSchema> {
    readonly schema: T

    constructor(schema: T) {
        this.schema = schema
    }

    /*
        Return only is insert was okey or not
    */
    // overloads for beauty
    insert(values: Partial<T>): Promise<Error | null>
    insert(values: Partial<T>[]): Promise<Error | null>

    async insert(values: Partial<T> | Partial<T>[]): Promise<Error | null> {
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

    async delete(condition: ConditionBuilder<T>): Promise<Error | null> {
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