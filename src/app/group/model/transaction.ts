import {Person} from './person';
export class Transaction {
  protected _amountDecimal: number;
  constructor(public id: number,
              public payer: Person,
              public amount: number,
              public createdTime?: Date,
              public modifiedTime?: Date) {
    this._amountDecimal = amount / 100;
  }

  public set amountDecimal(value) {
    this._amountDecimal = value;
    this.amount = value * 100;
  }

  public get amountDecimal() {
    return this._amountDecimal;
  }
}
