export class GroupStorageAdapter {
  public static fromDto(dto: any): GroupStorageAdapter {
    return new GroupStorageAdapter(
      dto.id,
      dto.name,
      new Date(dto.fetchedTime));
  }

  constructor(public id: string,
              public name: string,
              public fetchedTime: Date) {
  }

  public toDto(): any {
    return JSON.stringify(this);
  }
}
