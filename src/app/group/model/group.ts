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
    return Group.fromDto(JSON.parse(JSON.stringify(this)));
  }

  public getPeopleAsMap(): Map<number, Person> {
    const peopleMap = new Map<number, Person>();
    this.people.forEach((person: Person) => {
      peopleMap.set(person.id, person);
    });
    return peopleMap;
  }

  public hasDuplicatePerson(): boolean {
    const names = this.people.map((person: Person) => person.name);
    names.sort();
    for (let i = 0; i < names.length - 1; i++) {
      if (names[i].localeCompare(names[i + 1]) === 0) {
        return true;
      }
    }
    return false;
  }

  public isValid() {
    return this.id &&
      this.name &&
      this.currency &&
      !this.hasDuplicatePerson();
  }
}
