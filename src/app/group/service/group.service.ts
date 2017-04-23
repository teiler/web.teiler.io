import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {GroupResourceService, PersonResourceService} from '../resource';
import {Group, Person} from '../model';

@Injectable()
export class GroupService {

  constructor(private groupResourceService: GroupResourceService,
              private personResourceService: PersonResourceService) {
  }

  public createGroup(name: string): Observable<Group> {
    if (!name) {
      return Observable.throw(new Error('Group name is empty'));
    }
    return this.groupResourceService.createGroup(name).map((dto: any) => {
      return Group.fromDto(dto);
    }).catch((error: Error) => {
      return Observable.throw(error);
    });
  }

  public getGroup(id: string): Observable<Group> {
    if (!id) {
      return Observable.throw(new Error('Group ID is empty'));
    }
    return this.groupResourceService.getGroup(id)
      .map((dto: any) => {
        return Group.fromDto(dto);
      }).catch((error: Error) => {
        return Observable.throw(error);
      });
  }

  public updateGroup(group: Group, groupOriginal: Group): Observable<Group> {
    if (!group || !group.id) {
      return Observable.throw(new Error('Invalid group'));
    }

    const groupObs: Observable<any> = this.groupResourceService.updateGroup(
      group.id, group.name, group.currency);
    const newPersonObs: Observable<any>[] = [];
    const updatePersonObs: Observable<any>[] = [];
    const deletePersonObs: Observable<boolean>[] = [];

    const peopleOriginal: Map<number, Person> = this.getPeopleAsMap(groupOriginal.people);

    // find out new and edited people
    group.people.forEach((person: Person) => {
      // check new person
      if (!peopleOriginal.has(person.id)) {
        newPersonObs.push(this.personResourceService.createPerson(group.id, person.name));
      } else {
        // check if person has been changed
        const oldPerson = peopleOriginal.get(person.id);
        if (oldPerson.name !== person.name) {
          updatePersonObs.push(
            this.personResourceService.updatePerson(group.id, person.id, person.name));
        }
        peopleOriginal.delete(person.id);
      }
    });
    // the rest should be deletable group members
    peopleOriginal.forEach((person: Person, id: number) => {
      deletePersonObs.push(this.personResourceService.deletePerson(group.id, id));
    });

    return Observable.zip(
      groupObs,
      newPersonObs.length ? Observable.forkJoin(...newPersonObs) : Observable.of([]),
      updatePersonObs.length ? Observable.forkJoin(...updatePersonObs) : Observable.of([]),
      deletePersonObs.length ? Observable.forkJoin(...deletePersonObs) : Observable.of([]),
      (dto: any) => {
        return Group.fromDto(dto);
      }
    );
  }

  public deleteGroup(id: string): Observable<boolean> {
    if (!id) {
      return Observable.throw(new Error('Group ID is empty'));
    }
    return this.groupResourceService.deleteGroup(id);
  }

  private getPeopleAsMap(people: Person[]): Map<number, Person> {
    const peopleMap = new Map<number, Person>();
    people.forEach((person: Person) => {
      peopleMap.set(person.id, person);
    });
    return peopleMap;
  }
}
