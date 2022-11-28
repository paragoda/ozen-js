export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export type Result<T> = [data: T, ok: true] | [data: Error, ok: false]

