import {Transaction} from './transaction';
import {Person} from './person';

export class Compensation extends Transaction {
  public static fromDto(dto: any): Compensation {
    return new Compensation(
      parseInt(dto.id, 10),
      Person.fromDto(dto.payer),
      parseInt(dto.amount, 10),
      Person.fromDto(dto.profiteer),
      new Date(dto['create-time']),
      new Date(dto['update-time'])
    );
  }

  constructor(id: number,
              payer: Person,
              amount: number,
              public profiteer: Person,
              createdTime?: Date,
              modifiedTime?: Date) {
    super(id, payer, amount, createdTime, modifiedTime);
  }

  public isValid(): boolean {
    return this.amount > 0
      && this.payer !== null
      && this.profiteer !== null;
  }
}
