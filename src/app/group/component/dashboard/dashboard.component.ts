import {Component, OnInit} from '@angular/core';
import {Group} from '../../model/group';
import {ActivatedRoute} from '@angular/router';
import {NavigationService} from '../../../core/service/navigation.service';
import {GroupStorageService} from '../../service/group-storage.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'tylr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public group: Group;
  private groupSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private navigationService: NavigationService,
              private groupStorageService: GroupStorageService) {
  }

  ngOnInit() {
    // initialize components (probably a loading icon)
    this.group = this.groupStorageService.getCurrentGroup();
    if (!this.group) {
      this.navigationService.goHome();
      return;
    }

    this.groupStorageService.onCurrentGroupChanged
      .subscribe(
        (group: Group) => this.group = group
      );
  }
}
