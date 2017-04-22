import {Component, OnDestroy, OnInit} from '@angular/core';
import {Group} from '../../model/group';
import {LogService} from '../../../core/service/log.service';
import {Subscription} from 'rxjs/Subscription';
import {GroupStorageService} from '../../service/group-storage.service';

@Component({
  selector: 'tylr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public group: Group;

  private groupSubscription: Subscription;

  constructor(private groupStorageService: GroupStorageService,
              private logService: LogService) {
  }

  ngOnInit() {
    // initialize components (probably a loading icon)

    this.group = this.groupStorageService.getCurrentGroup();
    this.groupSubscription = this.groupStorageService.onCurrentGroupChanged
      .subscribe(
        (group: Group) => {
          this.group = group;
        },
        (error: Error) => this.logService.error(error)
      );
  }

  ngOnDestroy(): void {
    this.groupSubscription.unsubscribe();
  }
}
