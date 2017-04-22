import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {GroupResourceService, PersonResourceService} from '../resource';
import {Group} from '../model/group';

@Injectable()
export class GroupService {

  constructor(private groupResourceService: GroupResourceService) {
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

    const groupObs: Observable<any> = this.groupResourceService.updateGroup(group.id, group.name, group.currency);

    return Observable.zip(
      groupObs,
      function (dto: any) {
        // debugger;
        console.log(dto);
        return dto;
      },
      // function(error: Error){
      //   debugger;
      //   Observable.throw(error);
      // }
    );
    //
    // return this.groupResourceService.updateGroup(group.id, group.name, group.currency)
    //   .map((dto: any) => {
    //     return Group.fromDto(dto);
    //   }).catch((error: Error) => {
    //     return Observable.throw(error);
    //   });
  }

  public deleteGroup(id: string): Observable<boolean> {
    if (!id) {
      return Observable.throw(new Error('Group ID is empty'));
    }
    return this.groupResourceService.deleteGroup(id);
  }
}
