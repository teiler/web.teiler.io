import {Component, OnInit} from '@angular/core';
import {Group} from '../../model/group';
import {ActivatedRoute} from '@angular/router';
import {NavigationService} from '../../../core/service/navigation.service';

@Component({
  selector: 'tylr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public group: Group;

  constructor(private route: ActivatedRoute,
              private navigationService: NavigationService) {
  }

  ngOnInit() {
    // initialize components (probably a loading icon)
    this.group = this.route.snapshot.data['group'];
    if (!this.group) {
      this.navigationService.goHome();
    }
  }
}
