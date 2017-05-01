import {Transaction} from './transaction';
import {Person} from './person';
import {Profiteer} from './profiteer';

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
              public createdTime?: Date,
              public modifiedTime?: Date) {
    super(id, payer, amount, createdTime, modifiedTime);
  }
}
