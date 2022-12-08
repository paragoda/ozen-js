/**
 * Condition
 */


interface ICondition {

}

class ConditionBase implements ICondition {
  count() { }

  in() { }
}

class ConnectCondition implements ICondition {

  or(condition: ICondition) { }
  and() { }

}

export class NumberConditionBuilder {
  eq(value: number) {

  }

  less(value: number) {

  }

  // rename
  more(value: number) {

  }

  lessEq(value: number) {

  }

  moreEq(value: number) {

  }

  avg() {

  }

  max() { }
  min() { }
}