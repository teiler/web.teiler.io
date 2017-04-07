import {Component, OnInit} from '@angular/core';
import {Group} from '../../model/group';
import {GroupStorageService} from 'app/group';

@Component({
  selector: 'tylr-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.scss']
})
export class GroupHeaderComponent implements OnInit {
  public recentGroups: Group[] = [];

  constructor(private groupStorageService: GroupStorageService) {
  }

  ngOnInit() {
    const groupIterator = this.groupStorageService.getRecentGroups().values();
    let group = groupIterator.next();
    while (group.value) {
      this.recentGroups.push(group.value);
      group = groupIterator.next();
    }
  }


}
