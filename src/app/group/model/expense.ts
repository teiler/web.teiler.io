import {Transaction} from "./transaction";
import {Person} from "./person";
import {Profiteer} from "./profiteer";

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

  public splitEvenly() {
    const totalActive = this.getTotalActiveProfiteers();

    if (totalActive > 0) {
      const sharedValue = this.amount / totalActive;
      this.profiteers.forEach((profiteer: Profiteer) => {
        if (profiteer.isInvolved) {
          this.updateProfiteer(profiteer, sharedValue, false);
        }
      });

      if (!this.checkSumOfSharedAmount()) {
        this.adjustSharedAmount();
      }
    }
  }

  public splitEvenlyAmongRestProfiteers() {
    const rest = this.getTotalActiveProfiteers() - this.getTotalManuallyUpdatedProfiteers();

    if (rest > 0) {
      const delta = this.amount - this.getSumOfSharedAmount();
      const sharedDelta = delta / rest;

      this.profiteers.forEach((profiteer: Profiteer) => {
        if (profiteer.isInvolved && !profiteer.isUpdatedManually) {
          this.updateProfiteer(profiteer, profiteer.share + sharedDelta);
        }
      });

      if (!this.checkSumOfSharedAmount()) {
        this.adjustSharedAmount();
      }
    }
  }

  private adjustSharedAmount() {
    const delta = this.amount - this.getSumOfSharedAmount();
    const firstProfiteer = this.getFirstActiveProfiteer();
    if (firstProfiteer) {
      this.updateProfiteer(firstProfiteer, firstProfiteer.share + delta);
    }
  }

  private getFirstActiveProfiteer(): Profiteer {
    for (let i = 0; i < this.profiteers.length; i++) {
      if (this.profiteers[i].isInvolved && !this.profiteers[i].isUpdatedManually) {
        return this.profiteers[i];
      }
    }
    return null;
  }

  public getTotalActiveProfiteers(): number {
    return this.profiteers.reduce((total: number, profiteer: Profiteer) => {
      return profiteer.isInvolved ? total + 1 : total;
    }, 0);
  }

  private getTotalManuallyUpdatedProfiteers(): number {
    return this.profiteers.reduce((total: number, profiteer: Profiteer) => {
      return profiteer.isInvolved && profiteer.isUpdatedManually ? total + 1 : total;
    }, 0);
  }

  public checkSumOfSharedAmount(): boolean {
    return this.getSumOfSharedAmount() === this.amount;
  }

  private updatePercentage() {
    this.profiteers.forEach((profiteer: Profiteer) => {
      this.updateProfiteer(profiteer);
    });
  }

  public updateProfiteer(profiteer: Profiteer, share?: number, isUpdatedManually?: boolean) {
    if (typeof share !== 'undefined') {
      profiteer.share = share;

      if (typeof isUpdatedManually !== 'undefined') {
        profiteer.isUpdatedManually = isUpdatedManually;
      }
    }
    if (this.amount) {
      profiteer.setPercentageFormatted(profiteer.share / this.amount * 100);
    } else {
      profiteer.setPercentageFormatted(0);
    }
  }

  private getSumOfSharedAmount(): number {
    let sum = 0;
    this.profiteers.forEach((profiteer: Profiteer) => {
      sum += profiteer.share;
    });
    return sum;
  }

  public isValid(): boolean {
    return this.title
      && this.payer
      && this.amount > 0
      && this.getTotalActiveProfiteers() > 0
      && this.checkSumOfSharedAmount();
  }

  public fillProfiteers(people: Map<number, Person>, isInvolved: boolean) {
    this.profiteers.forEach((profiteer: Profiteer) => {
      people.delete(profiteer.person.id);
    });

    people.forEach((person: Person) => {
      this.profiteers.push(
        new Profiteer(person, 0, isInvolved)
      );
    });

    this.updatePercentage();
  }
}
