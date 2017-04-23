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
    this.setRecentGroups(this.groupStorageService.getRecentGroups());
    this.recentGroupsSubscription = this.groupStorageService.onRecentGroupsChanged
      .subscribe(
        (groups: GroupStorageAdapter[]) => this.setRecentGroups(groups),
        (error: Error) => this.logService.error(error, this.NAME)
      );
  }

  private setRecentGroups(recentGroups: GroupStorageAdapter[]) {
    this.recentGroups = recentGroups.sort((group1, group2) => {
      return group1.name.localeCompare(group2.name);
    });
  }

  edit() {
    this.navigationService.goToGroupEdit(this.groupStorageService.getCurrentGroup().id);
  }

  logout() {
    this.groupStorageService.removeRecentGroup(this.groupStorageService.getCurrentGroup().id);
    this.navigationService.goHome();
  }

  ngOnDestroy() {
    this.recentGroupsSubscription.unsubscribe();
  }
}
