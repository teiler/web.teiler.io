import {Component, OnInit, OnDestroy} from '@angular/core';
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
  private isGroupLoaded = false;

  constructor(private route: ActivatedRoute,
              private groupService: GroupService,
              private logService: LogService,
              private navigationService: NavigationService,
              private groupStorageService: GroupStorageService) {
    this.checkGroupFromStorage();
  }

  ngOnInit() {
    console.log('init');
    if (!this.isGroupLoaded) {
      this.loadGroup();
    }
  }

  checkGroupFromStorage() {
    this.route.params.map((params: Params) => {
      const id = params['id'];
      console.log(id);
      // check recently logged in group from storage
      const loggedInGroup: Group = this.groupStorageService.getCurrentGroup();
      if (loggedInGroup && loggedInGroup.id === id &&
        (loggedInGroup.fetchedTime.getTime() - new Date().getTime()) < this.CACHE_INVALID_TIME) {
        this.isGroupLoaded = true;
        this.logService.debug('group is loaded from storage', this.NAME);
      } else {
        this.groupStorageService.removeCurrentGroup();
        this.isGroupLoaded = false;
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
        this.isGroupLoaded = true;
        this.groupStorageService.storeGroup(group);
      },
      error => {
        this.logService.error(error);
        this.navigationService.goHome();
      }
    );
  }

  ngOnDestroy() {
    console.log('destroy');
    this.groupStorageService.removeCurrentGroup();
  }
}
