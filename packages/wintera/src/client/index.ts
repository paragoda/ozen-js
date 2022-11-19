import Table from './table'

class WinteraClient {
  private readonly _url: string

  public constructor(url: string) {
    this._url = url
  }

  public table(name: string) {
    return new Table(name, this._url)
  }
}

// functional way
function winteraClient(url: string) {
  return new WinteraClient(url)
}

export { winteraClient, WinteraClient }