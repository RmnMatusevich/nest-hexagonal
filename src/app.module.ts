import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AccountPersistanceModule } from './modules/account-persistence/account-persistence.module';
import { AccountWebModule } from './modules/account-web/account-web.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, '..', 'data', 'data.sqlite'),
      logging: true,
      autoLoadEntities: true,
    }),
    AccountPersistanceModule,
    AccountWebModule,
  ],
})
export class AppModule {}
