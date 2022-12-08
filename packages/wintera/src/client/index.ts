
import { DbTemplate } from '../server/types'
import Table from './table'


class WinteraClient<T extends DbTemplate> {
  private readonly _url: string

  public constructor(url: string) {
    this._url = url
  }

  public table(name: keyof T) {
    return new Table<T[keyof T]>(name.toString(), this._url)
  }

  public query(sql: string) {

  }
}

// functional way
function winteraClient<T extends DbTemplate>(url: string) {
  return new WinteraClient<T>(url)
}

export { winteraClient, WinteraClient }
export * from './model'
export * from './schema/index'