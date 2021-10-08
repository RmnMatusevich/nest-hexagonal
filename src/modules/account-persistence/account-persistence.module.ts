import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountPersistenceAdapter } from './account-persistence.adapter';
import { AccountOrmEntity } from './account.orm-entity';
import { ActivityOrmEntity } from './activity.orm-entity';
import { SendMoneyUseCaseSymbol } from 'src/domains/ports/in/send-money.use-case';
import { SendMoneyService } from 'src/domains/services/send-money.service';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AccountOrmEntity, ActivityOrmEntity])],
  providers: [
    AccountPersistenceAdapter,
    {
      provide: SendMoneyUseCaseSymbol,
      useFactory: (accountPersistenceAdapter) => {
        return new SendMoneyService(
          accountPersistenceAdapter,
          accountPersistenceAdapter,
        );
      },
      inject: [AccountPersistenceAdapter],
    },
  ],
  exports: [SendMoneyUseCaseSymbol],
})
export class AccountPersistanceModule {}
