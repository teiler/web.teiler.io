import {Transaction} from './transaction';
import {Person} from './person';
import {Profiteer} from './profiteer';

export class Expense extends Transaction {
  constructor(id: number,
              payer: Person,
              amount: number,
              public profiteers: Profiteer[]) {
    super(id, payer, amount);
  }
}
