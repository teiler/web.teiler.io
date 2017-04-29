import {Person} from './person';
export class Transaction {
  constructor(public id: number,
              public payer: Person,
              public amount: number,
              public createdTime?: Date,
              public modifiedTime?: Date) {
  }
}
