import { IField } from "./base"

abstract class ModifiedField implements IField {
    protected prev: IField
    
    constructor(prev: IField) {
      this.prev = prev
    }
    
    abstract build()
}

export class Optional extends ModifiedField {
    build() {
     return {
       ...this.prev.build(),
       optional: true
     }
   }
 
   public pk() {
     return new Pk(this)
   }
 }
 
export class Pk extends ModifiedField {
   // make it shorter to add (almost the same as in optional)
    build() {
     return {
       ...this.prev.build(),  
       pk: true
     }
   }
 
   public optional() {
     return new Optional(this)
   }
 }
