import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {GroupResourceService} from '../resource/group-resource.service';
import {Group} from '../model/group';

@Injectable()
export class GroupService {

  constructor(private groupResourceService: GroupResourceService) {
  }

  public createGroup(name: string): Observable<any> {
    console.log(`service: creating ${name} - should return Group Model`);
    return this.groupResourceService.createGroup(name);
  }

  public getGroup(id: string): Observable<Group> {
    if (!id) {
      return Observable.throw(new Error('Group ID is empty'));
    }
    return this.groupResourceService.getGroup(id)
      .map((dto: any) => {
        return Group.fromDto(dto);
      }).catch((error: any) => {
        return Observable.throw(error);
      });
  }
}
