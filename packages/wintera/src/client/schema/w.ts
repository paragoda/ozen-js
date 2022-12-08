import {
  BigintField, DecimalField, DoubleField, FloatField, IntField, SmallintField,
  TextField, UuidField, VarcharField, BoolField
} from "./fields"


/**
 * Start point to build schema
 * Like z in zod
 */


export default class W {

  // NUMERIC
  public smallint() { return new SmallintField() }
  public int() { return new IntField() }
  public bigint() { return new BigintField() }
  public float() { return new FloatField() }
  public double() { return new DoubleField() }
  public decimal() { return new DecimalField() }

  // date and time
  public date() {

  }
  public time() {

  }
  public datetime() {

  }
  public timestamp() {

  }

  // is the same? 
  public bool() { return new BoolField() }
  // public bit() { }


  // LITERAL

  /**
   * Unlimited (in real-world) string
   */
  public text() { return new TextField() }
  public varchar() { return new VarcharField() }

  /**
   * To generate automaticaly:
   * - set defaulted on client
   * - set generate on server
   */
  public uuid() { return new UuidField() }


  //
  public json() { }
  public enum() { }
}