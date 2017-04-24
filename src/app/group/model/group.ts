import {Person} from './person';
export class Group {
  private _fetchedTime: Date;

  public static fromDto(dto: any): Group {
    return new Group(
      dto.id,
      dto.name,
      dto.people ? dto.people.map((person: any) => Person.fromDto(person)) : [],
      dto.currency);
  }

  constructor(public id: string,
              public name: string,
              public people: Person[],
              public currency: string) {
    this._fetchedTime = new Date();
  }

  get fetchedTime(): Date {
    return this._fetchedTime;
  }

  public toDto(): any {
    return {
      id: this.id,
      name: this.name
    };
  }

  public clone(): Group {
    return JSON.parse(JSON.stringify(this));
  }
}
