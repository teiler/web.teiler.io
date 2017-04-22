import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {LogService, NavigationService} from 'app/core';

import {Group, Person} from '../../model';
import {GroupService} from '../../service';
import {Subscription} from 'rxjs/Subscription';
import {GroupStorageService} from '../../service/group-storage.service';

@Component({
  selector: 'tylr-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit, OnDestroy {
  private readonly NAME = 'GroupEditComponent';
  public group: Group;
  public response: string;
  private groupSubscription: Subscription;

  constructor(private groupService: GroupService,
              private groupStorageService: GroupStorageService,
              private logService: LogService,
              private navigationService: NavigationService) {
  }

  ngOnInit() {
    // initialize components (probably a loading icon)
    this.group = JSON.parse(JSON.stringify(this.groupStorageService.getCurrentGroup()));
    this.groupSubscription = this.groupStorageService.onCurrentGroupChanged
      .subscribe(
        (group: Group) => {
          this.group = Object.assign(group);
        },
        (error: Error) => this.logService.error(error)
      );
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

  ngOnDestroy(): void {
    this.groupSubscription.unsubscribe();
  }
}
