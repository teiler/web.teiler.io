import {Component, OnDestroy, OnInit} from '@angular/core';
import {Group} from '../../model/group';
import {LogService} from '../../../core/service/log.service';
import {Subscription} from 'rxjs/Subscription';
import {GroupStorageService} from '../../service/group-storage.service';
import {current} from 'codelyzer/util/syntaxKind';
import {GroupService} from '../../service/group.service';

@Component({
  selector: 'tylr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public group: Group;
  private readonly MAX_CACHE_TIME = 1000;

  private groupSubscription: Subscription;

  constructor(private groupStorageService: GroupStorageService,
              private groupService: GroupService,
              private logService: LogService) {
  }

  ngOnInit() {
    // initialize components (probably a loading icon)
    const currentGroup = this.groupStorageService.getCurrentGroup();
    this.setGroup(currentGroup);
    this.groupSubscription = this.groupStorageService.onCurrentGroupChanged
      .subscribe(
        (group: Group) => {
          this.setGroup(group);
        },
        (error: Error) => this.logService.error(error)
      );
  }

  private setGroup(updatedGroup: Group) {
    if (updatedGroup) {
      if ((new Date().getTime() - updatedGroup.fetchedTime.getTime()) < this.MAX_CACHE_TIME) {
        this.group = updatedGroup;
      } else {
        this.group = null;
        this.groupStorageService.removeCurrentGroup();
        this.groupService.getGroup(updatedGroup.id)
          .subscribe(
            (group: Group) => this.groupStorageService.storeGroup(group)
          );
      }
    }
  }

  ngOnDestroy(): void {
    this.groupSubscription.unsubscribe();
  }
}
