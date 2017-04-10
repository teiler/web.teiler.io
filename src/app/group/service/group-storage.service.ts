import {EventEmitter, Injectable} from '@angular/core';
import {Group} from '../model/group';
import {LogService} from 'app/core';
import {GroupStorageAdapter} from '../model/group-storage-adapter';

@Injectable()
export class GroupStorageService {
  private readonly NAME = 'GroupStorageService';
  private readonly RECENT_GROUPS = 'recent-groups';
  private readonly RECENT_GROUPS_SCHEMA = {key: 'recent-groups-schema', value: '1'};
  private readonly LIMIT_RECENT_GROUPS = 3;

  private currentGroup: Group;
  public onCurrentGroupChanged: EventEmitter<Group> = new EventEmitter();

  private recentGroups: Map<string, GroupStorageAdapter> = new Map();
  public onRecentGroupsChanged: EventEmitter<GroupStorageAdapter[]> = new EventEmitter();

  constructor(private logService: LogService) {
    // check if schema migration is needed
    if (localStorage.getItem(this.RECENT_GROUPS_SCHEMA.key) === this.RECENT_GROUPS_SCHEMA.value) {
      this.recentGroups = this.getRecentGroupsFromStorage();
    } else {
      localStorage.removeItem(this.RECENT_GROUPS);
      localStorage.setItem(this.RECENT_GROUPS_SCHEMA.key, this.RECENT_GROUPS_SCHEMA.value);
      this.setRecentGroups(this.recentGroups);
    }
  }

  public storeGroup(group: Group) {
    // update session storage
    this.storeCurrentGroup(group);

    // update local storage
    this.recentGroups.set(group.id, new GroupStorageAdapter(group.id, group.name, group.fetchedTime));
    this.setRecentGroups(this.recentGroups);
  }

  private storeCurrentGroup(group: Group) {
    this.currentGroup = group;
    this.onCurrentGroupChanged.emit(this.currentGroup);
  }

  public getRecentGroup(id: string): GroupStorageAdapter {
    return this.recentGroups.get(id);
  }

  public getCurrentGroup(): Group {
    return this.currentGroup;
  }

  public removeRecentGroup(id: string) {
    this.recentGroups.delete(id);
    this.setRecentGroups(this.recentGroups);
  }

  public removeCurrentGroup(shouldClearTrace = false) {
    if (this.currentGroup) {
      if (shouldClearTrace) {
        this.removeRecentGroup(this.currentGroup.id);
      }

      this.currentGroup = null;
      this.logService.debug('current group is removed from storage', this.NAME);
      this.onCurrentGroupChanged.emit(this.currentGroup);
    }
  }

  public getRecentGroups(): GroupStorageAdapter[] {
    const groupIterator = this.recentGroups.values();
    let mapItem = groupIterator.next();
    const groups: GroupStorageAdapter[] = [];
    while (mapItem.value) {
      groups.push(GroupStorageAdapter.fromDto(mapItem.value));
      mapItem = groupIterator.next();
    }
    return this.sortRecentGroups(groups).slice(0, this.LIMIT_RECENT_GROUPS);
  }

  private getRecentGroupsFromStorage(): Map<string, GroupStorageAdapter> {
    return this.stringToMap(localStorage.getItem(this.RECENT_GROUPS));
  }

  private setRecentGroups(map: Map<string, GroupStorageAdapter>) {
    localStorage.setItem(this.RECENT_GROUPS, this.mapToString(map));
    this.onRecentGroupsChanged.emit(this.getRecentGroups());
  }

  private mapToString(map: Map<string, GroupStorageAdapter>) {
    return JSON.stringify(Array.from(map.entries()));
  }

  private stringToMap(str: string): Map<string, GroupStorageAdapter> {
    return new Map<string, Group>(JSON.parse(str));
  }

  private sortRecentGroups(groups: GroupStorageAdapter[]): GroupStorageAdapter[] {
    return groups.sort((g1: GroupStorageAdapter, g2: GroupStorageAdapter) => {
      return g2.fetchedTime.getTime() - g1.fetchedTime.getTime();
    });
  }
}
