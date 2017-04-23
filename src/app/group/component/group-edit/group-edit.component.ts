import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {LogService, NavigationService} from 'app/core';

import {Group, Person} from '../../model';
import {GroupService} from '../../service';
import {GroupStorageService} from '../../service/group-storage.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'tylr-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit {
  private readonly NAME = 'GroupEditComponent';
  public group: Group;
  public response: string;

  constructor(private groupService: GroupService,
              private groupStorageService: GroupStorageService,
              private logService: LogService,
              private navigationService: NavigationService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    // the group should be cloned in order to compare with the original group later
    const currentGroup = this.route.snapshot.data['group'];

    if (!currentGroup) {
      this.navigationService.goHome();
    } else {
      this.group = currentGroup.clone();
    }
  }

  public saveGroup(groupEditForm: NgForm): boolean {
    if (groupEditForm.form.valid) {
      const groupOriginal: Group = this.groupStorageService.getCurrentGroup();
      this.groupService.updateGroup(this.group, groupOriginal)
        .subscribe(
          (group: Group) => {
            this.navigationService.goToDashboard(group.id);
          },
          (error: Error) => {
            this.response = error.message;
            this.logService.error(error);
          }
        );
    }
    return false;
  }

  public delete() {
    const currentGroupId = this.groupStorageService.getCurrentGroup().id;
    const deleteConfirmation = prompt(
      'Are you sure that you want to delete the group?\nIf so, please enter the first 4 characters of the group id.');

    if (deleteConfirmation === currentGroupId.substr(0, 4)) {
      this.groupService.deleteGroup(currentGroupId)
        .subscribe(
          (isDeleted: boolean) => {
            this.groupStorageService.removeRecentGroup(currentGroupId);
            this.navigationService.goHome();
          },
          (error: Error) => {
            this.logService.error(error, this.NAME);
          }
        );
    }
  }

  public addPerson() {
    this.group.people.push(new Person());
  }

  public deletePerson(i: number) {
    this.group.people.splice(i, 1);
  }

  public onCancel() {
    this.navigationService.goBack();
  }
}
