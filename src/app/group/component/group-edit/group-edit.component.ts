import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {LogService, NavigationService} from 'app/core';

import {Group, Person} from '../../model';
import {GroupService} from '../../service';
import {GroupStorageService} from '../../service/group-storage.service';
import {ActivatedRoute} from '@angular/router';
import {TylrErrorService} from '../../../core/service/tylr-error.service';
import {TylrApiError} from '../../../shared/model/tylr-api-error';
import {Debt} from '../../model/debt';

@Component({
  selector: 'tylr-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit {
  private readonly NAME = 'GroupEditComponent';
  public group: Group;
  private debts: Map<number, number> = new Map();
  public response: string;

  constructor(private groupService: GroupService,
              private groupStorageService: GroupStorageService,
              private logService: LogService,
              private navigationService: NavigationService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const currentGroup = this.route.snapshot.data['group'];
    const action = this.route.snapshot.queryParamMap.get('action');

    // the group should be cloned in order to compare with the original group later
    this.group = currentGroup.clone();
    this.loadDebts();

    if (action === 'add') {
      this.addPerson();
    }
  }

  private loadDebts() {
    this.groupService.getDebts(this.group.id)
      .subscribe(
        (debts: Debt[]) => {
          debts.forEach((debt: Debt) => {
            this.debts.set(debt.person.id, debt.balance);
          });
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

  public  delete() {
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
    } else {
      this.response = 'Delete confirmation failed';
    }
  }

  public  addPerson() {
    this.group.people.push(new Person());
  }

  public  deletePerson(i: number) {
    const person: Person = this.group.people[i];
    if (!this.debts.has(person.id) || this.debts.get(person.id) === 0) {
      this.group.people.splice(i, 1);
    } else {
      const errorMessage = TylrApiError.PERSON_HAS_UNSETTLED_DEBTS;
      this.response = errorMessage.replace('Person', person.name);
    }
  }

  public  onCancel() {
    this.navigationService.goBack();
  }
}
