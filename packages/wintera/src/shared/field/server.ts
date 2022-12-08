import { ClientFieid } from './base';



// add function which are useless on client
// to not have unnesessary data on client (less memory is used)
abstract class ServerField extends ClientFieid {
  abstract type(): string

  public pk() {

  }

  public unique() {

  }

  public check() {

  }
}
