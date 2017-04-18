import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {LogService, NavigationService} from 'app/core';

import {Group} from '../../model';
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
        },
        (error: Error) => this.logService.error(error)
      );
  }

  public editGroup(groupEditForm: NgForm): boolean {
    if (groupEditForm.form.valid) {
      return false;
    }
    return false;
  }

  public onCancel() {
    this.navigationService.goBack();
  }

  ngOnDestroy(): void {
    this.groupSubscription.unsubscribe();
  }
}
