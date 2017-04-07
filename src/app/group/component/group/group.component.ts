import {Component, OnInit} from '@angular/core';
import {GroupStorageService} from '../../service/group-storage.service';
import {Group} from '../../model/group';

@Component({
  selector: 'tylr-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
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
