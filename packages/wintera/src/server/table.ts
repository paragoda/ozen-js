import { Fields, Table, TableInit } from './types'

// TODO: return ob where vals equals names of keys

function table<T extends object>(data: TableInit<T>): Table<T> {

  // looks unsafe but if it works then ok
  let fields = {} as Fields<T>

  // for (const key in data.fields) {
  //   const element = data.fields[key];
  //   const field: Field = {

  //     // ...(element.toFieldType() as any)
  //   }

  //   Object.defineProperty(fields, key, field)
  // }



  return {
    access: data.access,
    fields
  }
}

export { table }