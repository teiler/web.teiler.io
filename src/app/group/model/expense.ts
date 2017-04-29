import {Transaction} from './transaction';
import {Person} from './person';
import {Profiteer} from './profiteer';

export class Expense extends Transaction {

  public static fromDto(dto: any): Expense {
    return new Expense(
      parseInt(dto.id, 10),
      Person.fromDto(dto.payer),
      parseInt(dto.amount, 10),
      dto.title,
      dto.profiteers.map((profiteer: any) => Profiteer.fromDto(profiteer))
    );
  }

  constructor(id: number,
              payer: Person,
              amount: number,
              public title: string,
              public profiteers: Profiteer[]) {
    super(id, payer, amount);
  }
}
