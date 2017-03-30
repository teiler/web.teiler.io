import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {GroupResourceService} from '../resource/group-resource.service';

@Injectable()
export class GroupService {

  constructor(private groupResourceService: GroupResourceService) {
  }

  public createGroup(name: string): Observable<any> {
    console.log(`service: creating ${name} - should return Group Model`);
    return this.groupResourceService.createGroup(name);
  }

  public getGroup(id: string): Observable<any> {
    console.log(`service: login ${name} - should return Group Model`);
    return this.groupResourceService.getGroup(id);
  }

}
