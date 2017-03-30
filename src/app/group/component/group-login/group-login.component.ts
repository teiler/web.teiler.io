import {Component, OnInit} from '@angular/core';
import {GroupService} from '../../service/group.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'tylr-group-login',
  templateUrl: './group-login.component.html',
  styleUrls: ['./group-login.component.css']
})
export class GroupLoginComponent implements OnInit {
  private groupId: string;
  private response: string;

  constructor(private groupService: GroupService) {
  }

  ngOnInit() {
  }

  public loginGroup(loginGroupForm: NgForm): boolean {
    if (loginGroupForm.form.valid) {
      console.log(`component: login - ${this.groupId}`);
      this.groupService.getGroup(this.groupId)
        .subscribe(
          (response: any) => {
            console.log('login response', response.value);
            this.response = JSON.stringify(response.value);
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
