import {Person} from "./person";

export class Profiteer {
  private _share: number;
  private _shareFormatted: string;
  private _percentageFormatted: string;
  private _isUpdatedManually = false;
  private _isInvolved: boolean;

  static fromDto(dto: any): Profiteer {
    return new Profiteer(Person.fromDto(dto.person), parseInt(dto.share, 10));
  }

  constructor(public person: Person,
              share: number,
              isInvolved = true) {
    this.share = share;
    this.isInvolved = isInvolved;
  }

  public set share(value: number) {
    if (value > 0) {
      this._share = Math.floor(value);
      this.setShareFormatted(this._share);
    } else {
      this._share = 0;
      this.setShareFormatted(0);
    }
  }

  public get share(): number {
    return this._share;
  }

  private setShareFormatted(value: number) {
    this._shareFormatted = (value / 100).toFixed(2);
  }

  public get shareFormatted(): string {
    return this._shareFormatted;
  }

  public get isInvolved(): boolean {
    return this._isInvolved;
  }

  public set isInvolved(value: boolean) {
    this._isInvolved = value;

    if (!value) {
      this.share = 0;
      this.setPercentageFormatted(0);
    }
  }

  public get percentageFormatted() {
    return this._percentageFormatted;
  }

  public setPercentageFormatted(value: number) {
    if (Math.abs(value - Math.floor(value)) > 0) {
      this._percentageFormatted = value.toFixed(1);
    } else {
      this._percentageFormatted = value.toFixed(0);
    }
  }

  public get isUpdatedManually(): boolean {
    return this._isUpdatedManually;
  }

  public set isUpdatedManually(value: boolean) {
    this._isUpdatedManually = value;
  }
}
