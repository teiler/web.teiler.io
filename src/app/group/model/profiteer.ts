import {Person} from './person';

export class Profiteer {
  private _shareFormatted: string;
  private _percentage: number;

  static fromDto(dto: any): Profiteer {
    return new Profiteer(Person.fromDto(dto.person), parseInt(dto.share, 10));
  }

  constructor(public person: Person,
              public share: number,
              public isInvolved = true) {
    this.setShareFormatted(share);
  }

  public updateShare(value: number) {
    this.share = Math.floor(value);
    this.setShareFormatted(value);
  }

  private setShareFormatted(value: number) {
    this._shareFormatted = (value / 100).toFixed(2);
  }

  public get shareFormatted(): string {
    return this._shareFormatted;
  }

  public get percentage() {
    return this._percentage;
  }

  public set percentage(value) {
    this._percentage = value;
  }
}
