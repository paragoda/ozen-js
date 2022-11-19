/*

Columunt type builders 

*/


// all
class TypeBuilder {
  protected _name: string

  constructor(name: string) {
    this._name = name
  }

  // primary key
  public pk() {
    return this
  }

  public nullable() {
    return this
  }

  public unique() {
    return this
  }

  /*
  https://stackoverflow.com/questions/20810134/why-unsigned-integer-is-not-available-in-postgresql
  https://www.w3schools.com/mysql/mysql_check.asp#:~:text=The%20CHECK%20constraint%20is%20used,other%20columns%20in%20the%20row.
  */
  public check() {

  }
}


// nums
class NumBuilder extends TypeBuilder {
  public unsigned() { }
}


class IntBuilder extends NumBuilder {
  public autoincrement() {
    this._name = this._name.replace('int', 'autoincrement')
  }
}


export { TypeBuilder, NumBuilder, IntBuilder }