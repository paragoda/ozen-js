import { Model, Table } from './types'

class ZimaAdmin {
  private _url: string
  private _token: string
  private tables: Table<object>[] = []

  public constructor(url: string, token: string) {
    this._url = url
    this._token = token
  }

  public table<T extends object>(table: Table<T>) {
    this.tables.push(table)
  }

  public route(name: string, sql: string) {
    // register custom route 
    // which will return sql query result  
  }

  public models(...models: Model<object>[]) {
    // register models
  }
}

const zimaadmin = (url: string, token: string) => new ZimaAdmin(url, token)

export { zimaadmin, ZimaAdmin }