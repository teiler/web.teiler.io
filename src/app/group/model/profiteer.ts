import {Person} from './person';
export class Profiteer {

  static fromDto(dto: any): Profiteer {
    return new Profiteer(Person.fromDto(dto.person), parseInt(dto.share, 10));
  }

  constructor(public person: Person,
              public share: number,
              public isActive = true) {

  }
}
