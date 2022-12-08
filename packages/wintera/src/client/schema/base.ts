
import { FieldBuildSchema, SqlType } from '../../shared/types'
import { Defaulted, Nullable } from './flags'

// TODO: make build() invisible from outside of sdk
export interface IField {
    /**
    * Build object to describe field to server.
    * Please don't use it on client.
    * It's made to reduce memory usage on client.
    */
    build(): FieldBuildSchema
}


export abstract class ClientFieid implements IField {

    abstract type(): SqlType


    /**
     * Method is used by Wintera to build attribute.
     * Not save it as property to use less memory.
     * Don't use it without special reasons.
     */
    build(): FieldBuildSchema { return { type: this.type() } }


    public nullable() { return new Nullable(this) }


    /**
     * Means that on the server will be defined default value.
     * What it does:
     * - field will be nullable/undefined on insert
     * - field will be NOT nullable/undefined when select it
     */
    public defaulted() { return new Defaulted(this) }
}