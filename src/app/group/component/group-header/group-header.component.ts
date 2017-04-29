import {Component, OnDestroy, OnInit} from '@angular/core';
import {GroupStorageService} from 'app/group';
import {Subscription} from 'rxjs/Subscription';
import {LogService, NavigationService} from 'app/core';
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

  constructor(private navigationService: NavigationService,
              private logService: LogService,
              private groupStorageService: GroupStorageService) {
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
