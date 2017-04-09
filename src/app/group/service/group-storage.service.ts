import {EventEmitter, Injectable} from '@angular/core';
import {Group} from '../model/group';
import {LogService} from 'app/core';

@Injectable()
export class GroupStorageService {
  private readonly NAME = 'GroupStorageService';
  private readonly RECENT_GROUPS = 'recent-groups';
  private readonly CURRENT_GROUP = 'current-group';

  private currentGroup: Group;
  public onCurrentGroupChanged: EventEmitter<Group> = new EventEmitter();

  private recentGroups: Map<string, Group> = new Map();
  public onRecentGroupsChanged: EventEmitter<Group[]> = new EventEmitter();

  constructor(private logService: LogService) {
    if (!localStorage.getItem(this.RECENT_GROUPS)) {
      this.setRecentGroups(this.recentGroups);
    } else {
      this.recentGroups = this.getRecentGroupsFromStorage();
    }
  }

  public storeGroup(group: Group) {
    // update session storage
    this.storeCurrentGroup(group);

    // update local storage
    this.recentGroups.set(group.id, group);
    this.setRecentGroups(this.recentGroups);
  }

  private storeCurrentGroup(group: Group) {
    this.currentGroup = group;
    this.onCurrentGroupChanged.emit(this.currentGroup);
  }

  public getGroup(id: string): Group {
    return this.recentGroups.get(id);
  }

  public getCurrentGroup(): Group {
    return this.currentGroup;
  }

  public removeGroup(id: string) {
    this.recentGroups.delete(id);
    this.setRecentGroups(this.recentGroups);
  }

  public removeCurrentGroup() {
    this.currentGroup = null;
    this.logService.debug('current group is removed from storage', this.NAME);
    this.onCurrentGroupChanged.emit(this.currentGroup);
  }

  public getRecentGroups(): Group[] {
    const groupIterator = this.recentGroups.values();
    let mapItem = groupIterator.next();
    const groups: Group[] = [];
    while (mapItem.value) {
      groups.push(mapItem.value);
      mapItem = groupIterator.next();
    }
    return groups;
  }

  private getRecentGroupsFromStorage(): Map<string, Group> {
    return this.stringToMap(localStorage.getItem(this.RECENT_GROUPS));
  }

  private setRecentGroups(map: Map<string, Group>) {
    localStorage.setItem(this.RECENT_GROUPS, this.mapToString(map));
    this.onRecentGroupsChanged.emit(this.getRecentGroups());
  }

  private mapToString(map: Map<string, Group>) {
    return JSON.stringify(Array.from(map.entries()));
  }

  private stringToMap(str: string): Map<string, Group> {
    return new Map<string, Group>(JSON.parse(str));
  }
}
