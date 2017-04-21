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
  private groupOriginal: Group;
  private groupSubscription: Subscription;

  constructor(private groupService: GroupService,
              private groupStorageService: GroupStorageService,
              private logService: LogService,
              private navigationService: NavigationService) {
  }

  ngOnInit() {
    // initialize components (probably a loading icon)
    this.group = this.groupStorageService.getCurrentGroup();
    this.groupSubscription = this.groupStorageService.onCurrentGroupChanged
      .subscribe(
        (group: Group) => {
          this.group = group;
          this.groupOriginal = group;
        },
        (error: Error) => this.logService.error(error)
      );
  }

  public editGroup(groupEditForm: NgForm): boolean {
    if (groupEditForm.form.valid) {
      this.groupService.updateGroup(this.group)
        .subscribe(
          (group: Group) => {
            this.navigationService.goToDashboard(group.id);
          },
          (error: Error) => this.logService.error(error)
        );
    }
    return false;
  }

  delete() {
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

  addPerson() {
    this.group.people.push(new Person());
  }

  public onCancel() {
    this.navigationService.goBack();
  }

  ngOnDestroy(): void {
    this.groupSubscription.unsubscribe();
  }
}
