import { NumberType, StringType } from "../../shared/types"
import { ClientFieid } from "./base"


export class BoolField extends ClientFieid {
    type(): 'bool' { return 'bool' } // you shuld specify return type for type check works well
}

// LITERALS
export abstract class StringField extends ClientFieid {
    abstract type(): StringType
}

export class TextField extends StringField {
    type(): 'text' { return 'text' }
}
// should specify size on server
export class VarcharField extends StringField {
    type(): 'varchar' { return 'varchar' }
}

export class UuidField extends StringField {
    type(): 'uuid' { return 'uuid' }
}


// NUMERIC
export abstract class NumberField extends ClientFieid {
    abstract type(): NumberType 
}

export class SmallintField extends NumberField {
    type(): 'smallint' { return 'smallint' } 
}
export class IntField extends NumberField {
    type(): 'int' { return 'int' }
}
export class BigintField extends NumberField {
    type(): 'bigint' { return 'bigint' }
}

export class FloatField extends NumberField {
    type(): 'float' { return 'float' }
}
export class DoubleField extends NumberField {
    type(): 'double' { return 'double' }
}

export class DecimalField extends NumberField {
    type(): 'decimal' { return 'decimal' }
}