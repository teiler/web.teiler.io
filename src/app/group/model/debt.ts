import {Person} from "./person";
/**
 * Created by Keerthikan on 10-May-17.
 */

export class Debt {
  public static fromDto(dto: any): Debt {
    return new Debt(
      Person.fromDto(dto.person),
      parseInt(dto.balance, 10)
    );
  }

  constructor(public person: Person,
              public balance: number) {
  }

  public get balanceDecimal(): number {
    return this.balance ? this.balance / 100 : 0;
  }
}
