import { Flag } from "../../shared/types"
import { ClientFieid, IField } from "./base"
import { BoolField, NumberField, StringField } from "./fields"
import { Defaulted, FlagField, Nullable } from "./flags"

export type Schema = {
    [key: string]: ClientFieid | FlagField<ClientFieid>
}

// Field Type to js type
type JsPrimitiveType<T extends ClientFieid> =
    T extends StringField ? string :
    T extends NumberField ? number :
    T extends BoolField ? boolean :
    never

// should be renamed
export type JsType<T extends IField> =
    T extends FlagField<ClientFieid> ? JsType<T['type']> :
    T extends ClientFieid ? JsPrimitiveType<T> : never


export type FieldBuildSchema = {
    type: string,
    flags?: Flag[]
    attributes?: {
        [attribut: string]: any // any?
    }
}