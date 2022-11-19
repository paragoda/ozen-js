import { HttpMethod } from '../types'

const headers = {}

function json(data: any): string {
  return JSON.stringify(data)
}

class Table {
  private readonly _name: string
  private readonly _url: string

  public constructor(name: string, url: string) {
    this._name = name
    this._url = url
  }

  private async fetchRoute(route: string, method: HttpMethod, body?: string) {
    const url = `${this._url}${encodeURIComponent(route)}`
    const data = await fetch(url, { headers, method, body })
    return await data.json()
  }

  // TODO: check on backend for tables polices
  public async query<T extends object>(sql: string): Promise<T[]> {
    return await this.fetchRoute(`/api/db/${sql}`, 'GET')
  }

  public async insert<T extends object>(
    items: object[], returning: string | null = '*'
  ): Promise<T> {
    return await this.fetchRoute(`/api/db/${this._name}`, 'POST',
      json({ values: items, returning }))
  }

  // TODO: check on backend is there inner select for tables polices
  public async update<T extends object>(
    item: object, where: string, returning: string | null = '*'
  ): Promise<T> {
    return await this.fetchRoute(`/api/db/${this._name}`, 'PATCH',
      json({ values: item, where, returning }))
  }

  // need it ???
  // TODO: check on backend is there inner select for tables polices
  public async upsert<T extends object>(
    item: T, where: string, returning: string | null = '*'
  ): Promise<T> {
    return await this.fetchRoute(`/api/db/${this._name}`, 'PUT',
      json({ values: item, where, returning })
    )
  }

  // PERFECT DELETE
  // TODO: check on backend is there inner select for tables polices
  public async delete(condition: string) {
    return await this.fetchRoute(`/api/db//${this._name}?where=${condition}`, 'DELETE')
  }
}

export default Table