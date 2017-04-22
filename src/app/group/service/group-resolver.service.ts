import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Group} from '../model/group';
import {GroupService} from './group.service';
import {GroupStorageService} from './group-storage.service';
import {LogService} from '../../core/service/log.service';
import {NavigationService} from '../../core/service/navigation.service';

@Injectable()
export class GroupResolverService implements Resolve<Group> {
  private readonly MAX_CACHE_TIME = 1000;

  constructor(private groupService: GroupService,
              private groupStorageService: GroupStorageService,
              private logService: LogService,
              private navigationService: NavigationService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Group> | Group {
    const currentGroup = this.groupStorageService.getCurrentGroup();
    if (currentGroup) {
      if ((new Date().getTime() - currentGroup.fetchedTime.getTime()) < this.MAX_CACHE_TIME) {
        return currentGroup;
      } else {
        this.groupStorageService.removeCurrentGroup();
        return this.getGroup(currentGroup.id);
      }
    } else {
      return this.getGroup(route.paramMap.get('id'));
    }
  }

  private getGroup(id: string): Observable<Group> {
    return this.groupService.getGroup(id)
      .map((group: Group) => {
        this.groupStorageService.storeGroup(group);
        return group;
      }).catch((error: Error) => {
        this.groupStorageService.removeRecentGroup(id);
        this.logService.error(error);
        return Observable.of<Group>(null);
      });
  }
}
