

/*

Module for building schemas of tables

REQUIREMENTS:
- minimal as possible on client
- extendable on server
- required by default

Look at zod

*/







class W {

  // numeric
  public smallint() {

  }
  public int() {

  }
  public bigint() {

  }
  public float() {

  }
  public double() {

  }
  public decimal() {

  }

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
  public bool() {

  }
  public bit() {

  }

  // string
  public text() {

  }
  public varchar() {

  }
  public uuid() {
    return new UuidField()
  }

  //
  public json() {

  }
  public enum() {

  }


}


// endpoint as z in zod
const w = new W()

export { w }