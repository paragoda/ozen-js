import { IntBuilder, NumBuilder, TypeBuilder } from './TypeBuilders'

// maybe they should be in class
// but I hate this
// just keep it local
const tb = (name: string) => new TypeBuilder(name)
const nb = (name: string) => new NumBuilder(name)
const ib = (name: string) => new IntBuilder(name)

// ColType
class ColBuilder {

  // numeric
  public bit = () => tb('bit')
  public smallint = () => ib('smallint')
  public int = () => ib('int')
  public bigint = () => ib('bigint')
  public float = () => nb('float')
  public double = () => nb('double')
  public decimal = () => nb('decimal')
  /*
  public smallautoincrement = () => new IntBuilder()
  public autoincrement = () => new IntBuilder()
  public bigautoincrement = () => new IntBuilder()
  */

  // date and time
  public date = () => tb('date')
  public time = () => tb('time')
  public datetime = () => tb('datetime')
  public timestamp = () => tb('timestamp')

  public bool = () => tb('bool')

  public uuid = () => tb('uuid')

  public text = () => tb('text')

  public varchar(size: number) {
    if (size < 1) throw new Error()
    return tb(`varchar(${size})`)
  }

  // ?????????????????????????????????????
  public enum = (...options: string[]) => tb('enum()')


  public json = () => tb('json')

  // TODO: rename independ
  // independ means not to delete when delete pk
  // THINK MORE
  public fk(key: TypeBuilder, independ: boolean = false) {
    return tb('key')
  }
}

const cb = new ColBuilder()

export { cb, ColBuilder }