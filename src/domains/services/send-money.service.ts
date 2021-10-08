import { UpdateAccountStatePort } from '../ports/out/update-account-state.port';
import { LoadAccountPort } from '../ports/out/load-account.port';
import { SendMoneyUseCase } from '../ports/in/send-money.use-case';
import { SendMoneyCommand } from '../ports/in/send-money.command';
import { AccountEntity } from '../entities/account.entity';

export class SendMoneyService implements SendMoneyUseCase {
  constructor(
    private readonly _loadAccountPort: LoadAccountPort,
    private readonly _updateAccountStatePort: UpdateAccountStatePort,
  ) {}
  async sendMoney(command: SendMoneyCommand): Promise<boolean> {
    const sourceAccount: AccountEntity =
      await this._loadAccountPort.loadAccount(command.sourceAccountId);
    const targetAccount: AccountEntity =
      await this._loadAccountPort.loadAccount(command.targetAccountId);
    if (!sourceAccount.withdraw(command.money, targetAccount.id)) {
      return false;
    }
    if (!targetAccount.deposit(command.money, sourceAccount.id)) {
      return false;
    }

    this._updateAccountStatePort.updateActivities(sourceAccount);
    this._updateAccountStatePort.updateActivities(targetAccount);
    return true;
  }
}
