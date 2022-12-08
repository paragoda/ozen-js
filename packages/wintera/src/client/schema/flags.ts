import { FieldBuildSchema, Flag } from "../../shared/types"
import { ClientFieid, IField } from "./base"

/**
 * Attributes with has value true or undefined
 * To form list of them
 * Such as pk, autoincrement, ...
 */
export abstract class FlagField<T extends ClientFieid> implements IField {
    type: T
  
    constructor(type: T) {
      this.type = type
    }
  
    build(): FieldBuildSchema {
      const build = this.type.build()
      const flag = this.flag()
  
      if (build.flags) {
        build.flags.push(flag)
      } else {
        build.flags = [flag]
      }
      return build
    }
  
    /**
     * Method is used by Wintera to build attribute
     * Not save it as property to use less memory
     */
    abstract flag(): Flag
  }
  
  /**
   * Optional was renamed to Nullable
   * To keep meaning
   * Because there is Defaulted
   */
  export class Nullable<T extends ClientFieid> extends FlagField<T> {
    flag(): 'nullable' { return 'nullable' }
  }
  
  /**
   * Client side flag, means that field has default value
   * Default value MUST be defined on the server
   */
  export class Defaulted<T extends ClientFieid> extends FlagField<T> {
    flag(): 'defaulted' { return 'defaulted' }
  }