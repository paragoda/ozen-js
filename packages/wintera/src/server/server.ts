import { WinteraServerInit } from './types'

class WinteraServer<T extends object> {
  private _init: WinteraServerInit<T>

  public constructor(init: WinteraServerInit<T>) {
    this._init = init
  }

  // public table<T extends object>(table: Table<T>) {
  //   this.tables.push(table)
  // }

  public client() {
    // return typesafe client for the server
  }

  public route(name: string, sql: string) {
    // register custom route 
    // which will return sql query result  
  }

}

const server = <T extends object>(init: WinteraServerInit<T>) => new WinteraServer(init)

export { server, WinteraServer }