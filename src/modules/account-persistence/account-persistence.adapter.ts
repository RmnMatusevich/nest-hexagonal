import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoadAccountPort } from 'src/domains/ports/out/load-account.port';
import { UpdateAccountStatePort } from 'src/domains/ports/out/update-account-state.port';
import { AccountEntity, AccountId } from 'src/domains/entities/account.entity';
import { AccountOrmEntity } from './account.orm-entity';
import { Repository } from 'typeorm';
import { ActivityOrmEntity } from './activity.orm-entity';
import { AccountMapper } from './account.mapper';

@Injectable()
export class AccountPersistenceAdapter
  implements LoadAccountPort, UpdateAccountStatePort
{
  constructor(
    @InjectRepository(AccountOrmEntity)
    private readonly _accountRepository: Repository<AccountOrmEntity>,
    @InjectRepository(ActivityOrmEntity)
    private readonly _activityRepository: Repository<ActivityOrmEntity>,
  ) {}
  async loadAccount(accountId: AccountId): Promise<AccountEntity> {
    const account = await this._accountRepository.findOne({
      userId: accountId,
    });

    if (account === undefined) {
      throw new Error('Account not found');
    }
    const activities = await this._activityRepository.find({
      ownerAccountId: accountId,
    });

    return AccountMapper.mapToDomain(account, activities);
  }
  updateActivities(account: AccountEntity) {
    account.activityWindow.activities.forEach((activity) => {
      if (activity.id === null) {
        this._activityRepository.save(
          AccountMapper.mapToActivityOrmEntity(activity),
        );
      }
    });
  }
}
