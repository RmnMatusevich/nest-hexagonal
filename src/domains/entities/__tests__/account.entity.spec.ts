import { AccountEntity, AccountId } from '../account.entity';
import { MoneyEntity } from '../money.entity';
import { ActivityWindowEntity } from '../activity-window.entity';
import { ActivityEntity } from '../activity.entity';
import BigNumber from 'bignumber.js';

describe('AccountEntity', () => {
  it('should calculatesBalance', async () => {
    const accountId: AccountId = '1';

    const firstActivity = new ActivityEntity(
      '42',
      '42',
      accountId,
      new Date(),
      MoneyEntity.of(new BigNumber(999)),
    );
    const secondActivity = new ActivityEntity(
      '42',
      '42',
      accountId,
      new Date(),
      MoneyEntity.of(new BigNumber(1)),
    );

    const account = new AccountEntity(
      accountId,
      MoneyEntity.of(new BigNumber(555)),
      new ActivityWindowEntity()
        .addActivity(firstActivity)
        .addActivity(secondActivity),
    );
    const balance = account.calculateBalance();
    expect(balance.amount).toEqual(MoneyEntity.of(new BigNumber(1555)).amount);
  });

  it('should withdrawalSucceeds', async () => {
    const accountId: AccountId = '1';

    const account = new AccountEntity(
      accountId,
      MoneyEntity.of(new BigNumber(1555)),
      new ActivityWindowEntity(),
    );

    const success = account.withdraw(MoneyEntity.of(new BigNumber(555)), '99');

    expect(success).toBeTruthy();
    expect(account.activityWindow.activities.length).toEqual(1);
    expect(account.calculateBalance().amount).toEqual(
      MoneyEntity.of(new BigNumber(1000)).amount,
    );
  });

  it('should withdrawalFailed', async () => {
    const accountId: AccountId = '1';

    const account = new AccountEntity(
      accountId,
      MoneyEntity.of(new BigNumber(1555)),
      new ActivityWindowEntity(),
    );

    const success = account.withdraw(MoneyEntity.of(new BigNumber(1556)), '99');

    expect(success).toBeFalsy();
    expect(account.activityWindow.activities.length).toEqual(0);
    expect(account.calculateBalance().amount).toEqual(
      MoneyEntity.of(new BigNumber(1555)).amount,
    );
  });

  it('should deposit success', async () => {
    const accountId: AccountId = '1';

    const account = new AccountEntity(
      accountId,
      MoneyEntity.of(new BigNumber(1555)),
      new ActivityWindowEntity(),
    );

    const success = account.deposit(MoneyEntity.of(new BigNumber(445)), '99');

    expect(success).toBeTruthy();
    expect(account.activityWindow.activities.length).toEqual(1);
    expect(account.calculateBalance().amount).toEqual(
      MoneyEntity.of(new BigNumber(2000)).amount,
    );
  });
});
