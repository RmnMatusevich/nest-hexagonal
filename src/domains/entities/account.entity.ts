import { MoneyEntity } from './money.entity';
import { ActivityWindow } from './activity-window.entity';
import { ActivityEntity } from './activity.entity';

export type AccountId = string;

export class AccountEntity {
  constructor(
    private _id: AccountId,
    private _baseLineBalance: MoneyEntity,
    private _activityWindow: ActivityWindow,
  ) {}

  public get activityWindow(): ActivityWindow {
    return this._activityWindow;
  }
  public get baseLineBalance(): MoneyEntity {
    return this._baseLineBalance;
  }
  public get id(): AccountId {
    return this._id;
  }

  public calculateBalance(): MoneyEntity {
    return MoneyEntity.add(
      this._baseLineBalance,
      this._activityWindow.calculateBalance(this.id),
    );
  }
  public withdraw(money: MoneyEntity, targetAccountId: AccountId): boolean {
    if (!this._mayWithdrawMoney(money)) {
      return false;
    }
    const withdrawal: ActivityEntity = new ActivityEntity(
      this.id,
      targetAccountId,
      new Date(),
      money,
    );
    this._activityWindow.addActivity(withdrawal);
    return true;
  }

  public deposit(money: MoneyEntity, sourceAccountId: AccountId): boolean {
    const deposit: ActivityEntity = new ActivityEntity(
      sourceAccountId,
      this.id,
      new Date(),
      money,
    );
    this._activityWindow.addActivity(deposit);
    return true;
  }

  private _mayWithdrawMoney(money: MoneyEntity): boolean {
    return MoneyEntity.add(
      this.calculateBalance(),
      money.negate(),
    ).isPositiveOrZero();
  }
}
