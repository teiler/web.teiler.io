import {Component, OnInit} from '@angular/core';
import {Group} from '../../model/group';
import {ActivatedRoute, Params} from '@angular/router';
import {GroupService} from '../../service/group.service';
import {LogService} from '../../../core/service/log.service';
import {NgFor} from '@angular/common';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'tylr-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit {
  public group: Group;

  constructor(private route: ActivatedRoute,
              private groupService: GroupService,
              private logService: LogService) {
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

  }

}
