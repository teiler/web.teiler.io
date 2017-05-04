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
              createdTime?: Date,
              modifiedTime?: Date) {
    super(id, payer, amount, createdTime, modifiedTime);
  }

  public split() {
    const totalActive = this.getTotalActiveProfiteers();
    const sharedValue = this.amount / totalActive;
    this.profiteers.forEach((profiteer: Profiteer) => {
      if (profiteer.isInvolved) {
        profiteer.updateShare(sharedValue);
      }
    });
  }

  public getTotalActiveProfiteers(): number {
    return this.profiteers.reduce((total: number, profiteer: Profiteer) => {
      return profiteer.isInvolved ? total + 1 : total;
    }, 0);
  }

  public checkSumOfSharedAmount(): boolean {
    let sum = 0;
    this.profiteers.forEach((profiteer: Profiteer) => {
      sum += profiteer.share;
    });
    return sum === this.amount;
  }

  public isValid(): boolean {
    return this.title
      && this.payer
      && this.amount > 0
      && this.getTotalActiveProfiteers() > 0
      && this.checkSumOfSharedAmount();
  }
}
