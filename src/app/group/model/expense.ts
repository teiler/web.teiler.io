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
      dto.profiteers.map((profiteer: any) => Profiteer.fromDto(profiteer)),
      new Date(dto['create-time']),
      new Date(dto['update-time'])
    );
  }

  constructor(id: number,
              payer: Person,
              amount: number,
              public title: string,
              public profiteers: Profiteer[],
              public createdTime?: Date,
              public modifiedTime?: Date) {
    super(id, payer, amount, createdTime, modifiedTime);
  }

  public split() {
    const totalActive = this.getTotalActiveProfiteers();
    const sharedValue = this.amountDecimal / totalActive;
    this.profiteers.forEach((profiteer: Profiteer) => {
      if (profiteer.isInvolved) {
        profiteer.shareDecimal = sharedValue;
      }
    });
  }

  public getTotalActiveProfiteers(): number {
    return this.profiteers.reduce((total: number, profiteer: Profiteer) => {
      return profiteer.isInvolved ? total + 1 : total;
    }, 0);
  }
}
