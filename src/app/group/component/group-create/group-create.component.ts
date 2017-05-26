import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {GroupService, GroupStorageService} from "../../service";
import {Group} from "../../model/group";
import {LogService, NavigationService} from "app/core";

@Component({
  selector: 'tylr-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.scss']
})
export class GroupCreateComponent implements OnInit {
  public groupName = '';
  public response: string;

  constructor(private groupService: GroupService,
              private groupStorageService: GroupStorageService,
              private logService: LogService,
              private navigationService: NavigationService) {
  }

  ngOnInit() {
  }

  public createGroup(createGroupForm: NgForm): boolean {
    if (createGroupForm.form.valid) {
      this.groupService.createGroup(this.groupName)
        .subscribe((group: Group) => {
            this.groupStorageService.storeGroup(group);
            this.navigationService.goToDashboard(group.id);
          },
          (error: any) => {
            this.logService.error(error);
            this.response = error.message;
          });
    }
    return false;
  }
}
