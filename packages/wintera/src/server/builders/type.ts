import { DataTimeType, IntType, INumberField, IObjectField, IStringField, NumberType, SqlType, StringType } from '../types/field'
/*

Columunt type builders 

*/

abstract class Field {
  isPk: boolean = false
  isOptional: boolean = false
  isUnique: boolean = false
  checkStr?: string

  public pk() {
    this.isPk = true
    return this
  }

  public optional() {
    this.isOptional = true
    return this
  }

  public unique() {
    this.isUnique = true
    return this
  }

  public check(condition: string) {
    this.checkStr = condition
    return this
  }
}


class NumberField extends Field implements INumberField {
  type: NumberType

  public constructor(type: NumberType) {
    super()
    this.type = type
  }
}

class IntField extends NumberField implements INumberField {
  isAutoincrement: boolean = false

  public constructor(type: IntType) {
    super(type)
  }

  public autoincrement() {
    this.isAutoincrement = true
    return this
  }
}

class StringField extends Field implements IStringField {
  type: StringType | DataTimeType

  public constructor(type: StringType | DataTimeType) {
    super()
    this.type = type
  }
}

// ?? should it extend Field
class Uuid implements IStringField {
  type: StringType = 'uuid'
}

// Can json field be a primary key or unique? or have check?
class JsonField extends Field implements IObjectField {
  type: 'json' = 'json'

}

export { StringField, Uuid, IntField, NumberField, JsonField }