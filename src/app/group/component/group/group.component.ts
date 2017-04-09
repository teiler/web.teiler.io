import {Component, OnInit, OnDestroy, OnChanges} from '@angular/core';
import {Group} from '../../model/group';
import {ActivatedRoute, Params} from '@angular/router';
import {GroupService, GroupStorageService} from '../../service';
import {LogService, NavigationService} from 'app/core/';

@Component({
  selector: 'tylr-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, OnDestroy {
  private readonly NAME = 'GroupComponent';
  private readonly CACHE_INVALID_TIME = 2000; // ms

  constructor(private route: ActivatedRoute,
              private groupService: GroupService,
              private logService: LogService,
              private navigationService: NavigationService,
              private groupStorageService: GroupStorageService) {
    this.checkGroupFromStorage();
  }

  ngOnInit() {
  }

  checkGroupFromStorage() {
    this.route.params.map((params: Params) => {
      const id = params['id'];

      // check recently logged in group from storage
      const loggedInGroup: Group = this.groupStorageService.getCurrentGroup();

      if (loggedInGroup && loggedInGroup.id === id &&
        (loggedInGroup.fetchedTime.getTime() - new Date().getTime()) < this.CACHE_INVALID_TIME) {
        this.logService.debug('group is already in storage', this.NAME);
      } else {
        this.groupStorageService.removeCurrentGroup();
        this.loadGroup();
      }
    }).subscribe();
  }

  private loadGroup() {
    this.logService.debug('fetch group from api', this.NAME);
    this.route.params.switchMap((params: Params) => {
      const id = params['id'];
      return this.groupService.getGroup(id);
    }).subscribe(
      (group: Group) => {
        this.groupStorageService.storeGroup(group);
      },
      error => {
        this.logService.error(error);
        this.navigationService.goHome();
      }
    );
  }

  ngOnDestroy() {
    this.groupStorageService.removeCurrentGroup();
  }
}
