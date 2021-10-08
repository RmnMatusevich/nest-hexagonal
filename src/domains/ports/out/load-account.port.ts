import { AccountId, AccountEntity } from 'src/domains/entities/account.entity';

export interface LoadAccountPort {
  loadAccount(accountId: AccountId): AccountEntity;
}
