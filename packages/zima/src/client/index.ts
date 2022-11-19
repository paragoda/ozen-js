import Table from './table'

class ZimaClient {
  private readonly _url: string

  public constructor(url: string) {
    this._url = url
  }

  public table(name: string) {
    return new Table(name, this._url)
  }
}

// functional way
function zimaclient(url: string) {
  return new ZimaClient(url)
}

export { zimaclient, ZimaClient }