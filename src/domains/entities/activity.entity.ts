import { AccountId } from './account.entity';
import { MoneyEntity } from './money.entity';

export class ActivityEntity {
  constructor(
    private _sourceAccountId: AccountId,
    private _targetAccountId: AccountId,
    private _timestamp: Date,
    private _money: MoneyEntity,
  ) {}

  public get money(): MoneyEntity {
    return this._money;
  }
  public get timestamp(): Date {
    return this._timestamp;
  }
  public get targetAccountId(): AccountId {
    return this._targetAccountId;
  }
  public get sourceAccountId(): AccountId {
    return this._sourceAccountId;
  }
}
