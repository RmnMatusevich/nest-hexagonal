import { AccountId } from '../../entities/account.entity';
import { MoneyEntity } from '../../entities/money.entity';

export class SendMoneyCommand {
  constructor(
    private _sourceAccountId: AccountId,
    private _targetAccountId: AccountId,
    private _money: MoneyEntity,
  ) {}
  public get money(): MoneyEntity {
    return this._money;
  }
  public get targetAccountId(): AccountId {
    return this._targetAccountId;
  }
  public get sourceAccountId(): AccountId {
    return this._sourceAccountId;
  }
}
