import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {GroupService} from '../../service/group.service';

@Component({
  selector: 'tylr-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit {
  public groupName = '';
  public response = 'test';

  constructor(private groupService: GroupService) {
  }

  ngOnInit() {
  }

  public createGroup(createGroupForm: NgForm): boolean {
    if (createGroupForm.form.valid) {
      console.log(`component: submit create form - ${this.groupName}`);
      this.groupService.createGroup(this.groupName)
        .subscribe((response: string) => {
          this.response = response;
        });
    }
    return false;
  }
}
