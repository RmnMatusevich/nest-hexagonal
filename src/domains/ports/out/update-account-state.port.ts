import { AccountEntity } from 'src/domains/entities/account.entity';

export interface UpdateAccountStatePort {
  updateActivities(account: AccountEntity);
}
