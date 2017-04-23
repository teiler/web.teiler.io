export class Person {
  static fromDto(dto: any): Person {
    return new Person(parseInt(dto.id, 10), dto.name);
  }

  constructor(public id?: number,
              public name?: string) {
  }

  public toDto(): any {
    return {
      id: this.id,
      name: this.name
    };
  }
}
