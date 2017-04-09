import {Component, OnDestroy, OnInit} from '@angular/core';
import {Group} from '../../model/group';
import {GroupStorageService} from 'app/group';
import {Subscription} from 'rxjs/Subscription';
import {LogService, NavigationService} from 'app/core';
import {GroupService} from '../../service/group.service';
import {GroupStorageAdapter} from '../../model/group-storage-adapter';

@Component({
  selector: 'tylr-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.scss']
})
export class GroupHeaderComponent implements OnInit, OnDestroy {
  private readonly NAME = 'GroupHeaderComponent';
  public recentGroups: GroupStorageAdapter[] = [];
  private recentGroupsSubscription: Subscription;

  constructor(private groupService: GroupService,
              private groupStorageService: GroupStorageService,
              private navigationService: NavigationService,
              private logService: LogService) {
  }

  ngOnInit() {
    this.recentGroups = this.groupStorageService.getRecentGroups();
    this.recentGroupsSubscription = this.groupStorageService.onRecentGroupsChanged
      .subscribe(
        (groups: GroupStorageAdapter[]) => this.recentGroups = groups,
        (error: Error) => this.logService.error(error, this.NAME)
      );
  }

  logout() {
    this.groupStorageService.removeRecentGroup(this.groupStorageService.getCurrentGroup().id);
    this.navigationService.goHome();
  }

  delete() {
    const currentGroupId = this.groupStorageService.getCurrentGroup().id;
    this.groupService.deleteGroup(currentGroupId)
      .subscribe(
        (isDeleted: boolean) => {
          this.groupStorageService.removeRecentGroup(currentGroupId);
          this.navigationService.goHome();
        },
        (error: Error) => {
          this.logService.error(error, this.NAME);
        }
      );
  }

  ngOnDestroy() {
    this.recentGroupsSubscription.unsubscribe();
  }

}
