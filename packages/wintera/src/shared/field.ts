abstract class AField {
  protected isPk: boolean = false
  protected isOptional: boolean = false
}

abstract class ClientField extends AField {
  public optional() {
    this.isOptional = true
    return this
  }

  public pk() {
    this.isPk = true
    return this
  }

  /**
  * Should be on client to indetify:
  * can field be undefined on insert
  */
  public default() {

  }
}

// add function which are useless on client
// to not have unnesessary data on client (less memory is used)
class ServerField extends ClientField {
  public unique() {

  }

  public check() {

  }
}

export { ClientField, ServerField }