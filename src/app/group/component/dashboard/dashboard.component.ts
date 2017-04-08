import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {GroupService} from '../../service/group.service';
import {Group} from '../../model/group';
import {LogService} from '../../../core/service/log.service';

@Component({
  selector: 'tylr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public group: Group;

  constructor(private groupService: GroupService,
              private logService: LogService) {
  }

  ngOnInit() {
    // initialize components (probably a loading icon)
  }
}
