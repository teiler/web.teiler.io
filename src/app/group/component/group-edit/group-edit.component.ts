import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {NgForm} from '@angular/forms';

import {LogService, NavigationService} from 'app/core';

import {Group} from '../../model';
import {GroupService} from '../../service';

@Component({
  selector: 'tylr-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit {
  public group: Group;

  constructor(private route: ActivatedRoute,
              private groupService: GroupService,
              private logService: LogService,
              private navigationService: NavigationService) {
  }

  ngOnInit() {
    // initialize components (probably a loading icon)
    this.getGroup();
  }

  public getGroup() {
    this.route.params.switchMap((params: Params) => {
      const id = params['id'];
      return this.groupService.getGroup(id);
    }).subscribe(
      (group: Group) => {
        this.group = group;
      },
      error => this.logService.error(error)
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

}
