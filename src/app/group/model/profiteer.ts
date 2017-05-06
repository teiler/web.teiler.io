import {Person} from './person';

export class Profiteer {
  private _shareFormatted: string;
  private _percentageFormatted: string;
  private _isUpdatedManually = false;

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

  public get percentageFormatted() {
    return this._percentageFormatted;
  }

  public setPercentageFormatted(value: number) {
    this._percentageFormatted = value.toFixed(1);
  }

  public get isUpdatedManually(): boolean{
    return this._isUpdatedManually;
  }

  public set isUpdatedManually(value: boolean){
    this._isUpdatedManually = value;
  }
}
