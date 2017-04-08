import {Component, OnInit} from '@angular/core';
import {Group} from '../../model/group';
import {ActivatedRoute, Params} from '@angular/router';
import {GroupService, GroupStorageService} from '../../service';
import {LogService, NavigationService} from 'app/core/';

@Component({
  selector: 'tylr-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  public group: Group;

  constructor(private route: ActivatedRoute,
              private groupService: GroupService,
              private logService: LogService,
              private navigationService: NavigationService,
              private groupStorageService: GroupStorageService) {
    this.getGroup();
  }

  ngOnInit() {
  }

  getGroup() {
    this.route.params.switchMap((params: Params) => {
      const id = params['id'];

      // todo: check recently logged in groups (<5s)
      return this.groupService.getGroup(id);
    }).subscribe(
      (group: Group) => {
        this.group = group;
        this.groupStorageService.storeGroup(group);
      },
      error => {
        this.logService.error(error);
        this.navigationService.goHome();
      }
    );
  }



}
