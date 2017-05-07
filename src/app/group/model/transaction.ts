import {Person} from './person';
export abstract class Transaction {
  constructor(public id: number,
              public payer: Person,
              public amount: number,
              public createdTime?: Date,
              public modifiedTime?: Date) {
  }

  public get amountDecimal(): number {
    return (this.amount / 100);
  }

  public abstract isValid(): boolean;
}
