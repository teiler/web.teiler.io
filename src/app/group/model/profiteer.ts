import {Person} from './person';
export class Profiteer {
  private _shareDecimal: number;
  private _percentage: number;

  static fromDto(dto: any): Profiteer {
    return new Profiteer(Person.fromDto(dto.person), parseInt(dto.share, 10));
  }

  constructor(public person: Person,
              public share: number,
              public isInvolved = true) {
    this._shareDecimal = share / 100;
  }

  public set shareDecimal(value: number) {
    this._shareDecimal = value;
    this.share = Math.floor(value * 100);
  }

  public get shareDecimal() {
    return this._shareDecimal;
  }

  public get percentage() {
    return this._percentage;
  }

  public set percentage(value) {
    this._percentage = value;
  }
}
