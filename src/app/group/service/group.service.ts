import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {GroupResourceService, PersonResourceService} from '../resource';
import {Group, Person} from '../model';
import {ValidationUtil} from '../../shared/util/validation-util';
import {Debt} from '../model/debt';
import {Compensation} from 'app/group/model/compensation';

@Injectable()
export class GroupService {

  constructor(private groupResourceService: GroupResourceService,
              private personResourceService: PersonResourceService) {
  }

  public createGroup(name: string): Observable<Group> {
    try {
      ValidationUtil.validateGroupName(name);
    } catch (error) {
      return Observable.throw(error);
    }

    return this.groupResourceService.createGroup(name).map((dto: any) => {
      return Group.fromDto(dto);
    }).catch((error: Error) => {
      return Observable.throw(error);
    });
  }

  public getGroup(id: string): Observable<Group> {
    try {
      ValidationUtil.validateGroupId(id);
    } catch (error) {
      return Observable.throw(error);
    }

    return this.groupResourceService.getGroup(id)
      .map((dto: any) => {
        return Group.fromDto(dto);
      }).catch((error: Error) => {
        return Observable.throw(error);
      });
  }

  public updateGroup(group: Group, groupOriginal: Group): Observable<Group> {
    try {
      ValidationUtil.validateGroup(group);
    } catch (error) {
      return Observable.throw(error);
    }

    // container for person CUD operations
    const newPersonObs: Observable<any>[] = [];
    const updatePersonObs: Observable<any>[] = [];
    const deletePersonObs: Observable<boolean>[] = [];

    const peopleOriginal: Map<number, Person> = groupOriginal.getPeopleAsMap();
    group.people.forEach((person: Person) => {
      // person create
      if (!peopleOriginal.has(person.id)) {
        newPersonObs.push(this.personResourceService.createPerson(group.id, person.name));
      } else {
        // person edit
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

    const groupObs: Observable<any> = this.groupResourceService.updateGroup(
      group.id, group.name, group.currency);

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
    try {
      ValidationUtil.validateGroupId(id);
    } catch (error) {
      return Observable.throw(error);
    }
    return this.groupResourceService.deleteGroup(id);
  }

  public getDebts(id: string): Observable<Debt[]> {
    try {
      ValidationUtil.validateGroupId(id);
    } catch (error) {
      return Observable.throw(error);
    }

    return this.groupResourceService.getDebts(id)
      .map((dto: any) => {
        const debts: Debt[] = [];
        dto.forEach((debtDto: any) => {
          const debt: Debt = Debt.fromDto(debtDto);
          if (debt.person.active) {
            debts.push(debt);
          }
        });
        return debts;
      }).catch((error: Error) => {
        return Observable.throw(error);
      });
  }

  public getSuggestedPayments(id: string): Observable<Compensation[]> {
    try {
      ValidationUtil.validateGroupId(id);
    } catch (error) {
      return Observable.throw(error);
    }

    return this.groupResourceService.getSuggestedPayments(id)
      .map((dto: any) => {
        const compensations: Compensation[] = [];
        dto.forEach((compensation: any) => {
          compensations.push(Compensation.fromDto(compensation));
        });
        return compensations;
      }).catch((error: Error) => {
        return Observable.throw(error);
      });
  }
}
