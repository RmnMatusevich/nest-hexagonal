import { BigNumber } from 'bignumber.js';

export class MoneyEntity {
  constructor(private readonly _amount: BigNumber) {}
  static ZERO() {
    return new MoneyEntity(new BigNumber(0));
  }
  static of(value: BigNumber) {
    return new MoneyEntity(new BigNumber(value));
  }

  get amount(): BigNumber {
    return this._amount;
  }

  static add(a: MoneyEntity, b: MoneyEntity): MoneyEntity {
    return new MoneyEntity(a.amount.plus(b.amount));
  }

  negate() {
    return new MoneyEntity(this.amount.negated());
  }
}