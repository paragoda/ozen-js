import { IField } from "./base"
import { Optional, Pk } from "./modifiers"

export class UuidField implements IField {
    build() {
        return {
          type: 'uuid'
        }
    }
  
    public optional() { return new Optional(this) }
  
    public pk() { return new Pk(this) }
}

abstract class BaseFieid implements IField {
    abstract build()
    public optional() { return new Optional(this) }
  
    public pk() { return new Pk(this) }

    /**
     * Means that on the server will be defined default value.
     * What it does:
     * - field will be optional on insert
     * - field will be NOT optional when select it
     */
    public defaulted() {
        throw new Error('unimplemented')
    }
}

export class NumberField extends BaseFieid {
    build() {
        return { type: '' }    
    }

}