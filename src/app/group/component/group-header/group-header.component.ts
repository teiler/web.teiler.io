import {Component, OnDestroy, OnInit} from '@angular/core';
import {Group} from '../../model/group';
import {GroupStorageService} from 'app/group';
import {Subscription} from 'rxjs/Subscription';
import {LogService, NavigationService} from 'app/core';

@Component({
  selector: 'tylr-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.scss']
})
export class GroupHeaderComponent implements OnInit, OnDestroy {
  private readonly NAME = 'GroupHeaderComponent';
  public recentGroups: Group[] = [];
  private recentGroupsSubscription: Subscription;

  constructor(private groupStorageService: GroupStorageService,
              private navigationService: NavigationService,
              private logService: LogService) {
  }

  ngOnInit() {
    this.recentGroups = this.groupStorageService.getRecentGroups();
    this.recentGroupsSubscription = this.groupStorageService.onRecentGroupsChanged
      .subscribe(
        (groups: Group[]) => this.recentGroups = groups,
        (error: Error) => this.logService.error(error, this.NAME)
      );
  }

  logout() {
    this.groupStorageService.removeGroup(this.groupStorageService.getCurrentGroup().id);
    this.navigationService.goHome();
  }

  ngOnDestroy() {
    this.recentGroupsSubscription.unsubscribe();
  }

}
