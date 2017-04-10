import {Component, OnInit} from '@angular/core';
import {GroupService} from '../../service/group.service';
import {NgForm} from '@angular/forms';
import {Group} from '../../model/group';
import {NavigationService} from 'app/core';
import {LogService} from '../../../core/service/log.service';
import {GroupStorageService} from '../../service/group-storage.service';

@Component({
  selector: 'tylr-group-login',
  templateUrl: './group-login.component.html',
  styleUrls: ['./group-login.component.scss']
})
export class GroupLoginComponent implements OnInit {
  public groupId: string;
  public response: string;

  constructor(private groupService: GroupService,
              private groupStorageService: GroupStorageService,
              private logService: LogService,
              private navigationService: NavigationService) {
  }

  ngOnInit() {
  }

  public loginGroup(loginGroupForm: NgForm): boolean {
    if (loginGroupForm.form.valid) {
      this.groupService.getGroup(this.groupId)
        .subscribe(
          (group: Group) => {
            this.groupStorageService.storeGroup(group);
            this.navigationService.goToDashboard(group.id);
          },
          (error: any) => {
            this.logService.error(error);
            this.response = error.message;
          }
        );
    }
    return false;
  }
}
