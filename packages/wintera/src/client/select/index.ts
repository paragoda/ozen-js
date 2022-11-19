const spaces = (...strs: string[]) => strs.join(' ')

abstract class CenterQueryBuilder {
  protected _sql: string
  toString() { return this._sql }

  protected abstract keyword(): string;

  constructor(prev: string, after: string) {
    this._sql = spaces(prev, this.keyword(), after)
  }
}

class Select {
  private _sql: string

  constructor(cols: string) { this._sql = spaces('SELECT', cols) }

  from(tables: string) { return new From(this._sql, tables) }
  distinct() { return new Distinct(this._sql) }
}

class Distinct {
  protected _sql: string

  constructor(prev: string) { this._sql = prev.replace('SELECT', 'SELECT DISTINCT') }

  from(tables: string) { return new From(this._sql, tables) }
}

class From extends CenterQueryBuilder {
  protected keyword() { return 'FROM' }

  orderby(cols: string) { return new Orderby(this._sql, cols) }
  groupby(cols: string) { return new GroupBy(this._sql, cols) }
  join(table: string) { return new Join(this._sql, table) }
  where(condition: string) { return new Where(this._sql, condition) }
  having(condition: string) { return new Having(this._sql, condition) }
}

class Join extends CenterQueryBuilder {
  protected keyword() { return 'JOIN' }


  on(condition: string) { return new On(this._sql, condition) }
}

class On extends CenterQueryBuilder {
  protected keyword() { return 'ON' }

  orderby(cols: string) { return new Orderby(this._sql, cols) }
  groupby(cols: string) { return new GroupBy(this._sql, cols) }
  where(condition: string) { return new Where(this._sql, condition) }
  having(condition: string) { return new Having(this._sql, condition) }
  join(table: string) { return new Join(this._sql, table) }
}

class Where extends CenterQueryBuilder {
  protected keyword() { return 'WHERE' }

  orderby(cols: string) { return new Orderby(this._sql, cols) }
  groupby(cols: string) { return new GroupBy(this._sql, cols) }
  having(condition: string) { return new Having(this._sql, condition) }
}

class GroupBy extends CenterQueryBuilder {
  protected keyword() { return 'GROUP BY' }

  orderby(cols: string) { return new Orderby(this._sql, cols) }
  having(condition: string) { return new Having(this._sql, condition) }
}

class Orderby extends CenterQueryBuilder {
  protected keyword() { return 'ORDER BY' }

  having = (condition: string) => new Having(this._sql, condition)
}


class Having extends CenterQueryBuilder {
  protected keyword() { return 'HAVING' }

  orderby(cols: string) { return new Orderby(this._sql, cols) }
}

const select = <T extends object>(...cols: (keyof T)[]) => new Select(cols.toString())

export { Select, select }