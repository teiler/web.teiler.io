import {Component, OnInit} from '@angular/core';
import {GroupService} from '../../service/group.service';
import {NgForm} from '@angular/forms';
import {Group} from '../../model/group';

@Component({
  selector: 'tylr-group-login',
  templateUrl: './group-login.component.html',
  styleUrls: ['./group-login.component.css']
})
export class GroupLoginComponent implements OnInit {
  public groupId: string;
  public response: string;

  constructor(private groupService: GroupService) {
  }

  ngOnInit() {
  }

  public loginGroup(loginGroupForm: NgForm): boolean {
    if (loginGroupForm.form.valid) {
      this.groupService.getGroup(this.groupId)
        .subscribe(
          (group: Group) => {
            this.response = JSON.stringify(group);
          },
          (error: any) => {
            console.log('error', error);
            this.response = error.message;
          }
        );
    }
    return false;
  }
}
