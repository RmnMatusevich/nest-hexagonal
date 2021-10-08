import { AccountId } from 'src/domains/entities/account.entity';

export interface GetAccountBalanceQuery {
  getAccountBalance(accountId: AccountId);
}
