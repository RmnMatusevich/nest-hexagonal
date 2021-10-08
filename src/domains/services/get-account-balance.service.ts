import { GetAccountBalanceQuery } from '../ports/in/get-account-balance.query';
import { LoadAccountPort } from '../ports/out/load-account.port';
import { AccountId } from '../entities/account.entity';

export class GetAccountBalanceService implements GetAccountBalanceQuery {
  constructor(private readonly _loadAccountPort: LoadAccountPort) {}
  getAccountBalance(accountId: AccountId) {
    this._loadAccountPort.loadAccount(accountId).calculateBalance();
  }
}
/// !!!!!!!!!!!!!!!!!
