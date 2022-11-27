import { Field, IBooleanField, INumberField, IStringField } from '../types/field'
import { IntField, JsonField, NumberField, StringField } from './type'

// maybe they should be in class
// but I hate this
// just keep it local

// ColType
class ColBuilder {

  // numeric
  public smallint = () => new IntField('smallint')
  public int = () => new IntField('int')
  public bigint = () => new IntField('bigint')
  public bit = () => new NumberField('bit')
  public float = () => new NumberField('float')
  public double = () => new NumberField('double')
  public decimal = () => new NumberField('decimal')
  /*
  public smallautoincrement = () => new IntBuilder()
  public autoincrement = () => new IntBuilder()
  public bigautoincrement = () => new IntBuilder()
  */

  // date and time
  public date = () => new StringField('date')
  public time = () => new StringField('time')
  public datetime = () => new StringField('datetime')
  public timestamp = () => new StringField('timestamp')

  public bool = (): IBooleanField => ({
    type: 'bool'
  })

  public uuid = (): IStringField => ({
    type: 'uuid'
  })

  public text = () => new StringField('text')

  public varchar(size: number) {
    if (size < 1) throw new Error('Varchar size can\'t be less than 1')
    return new StringField('varchar')
  }

  // ?????????????????????????????????????
  // public enum = (...options: string[]) => tb('enum()')


  public json = () => new JsonField()

  // TODO: rename independ
  // independ means not to delete when delete pk
  // THINK MORE
  // public fk(key: Field<any>, independ: boolean = false) {
  //   return tb('key')
  // }
}

const cb = new ColBuilder()

export { cb, ColBuilder }