import {Injectable} from '@angular/core';
import {Group} from '../model/group';

@Injectable()
export class GroupStorageService {
  private readonly RECENT_GROUPS = 'recent-groups';

  constructor() {
    if (!localStorage.getItem(this.RECENT_GROUPS)) {
      this.setRecentGroups(new Map<string, Group>());
    }
  }

  public storeGroup(group: Group) {
    const recentGroups: Map<string, Group> = this.getRecentGroups();
    recentGroups.set(group.id, group);
    this.setRecentGroups(recentGroups);
  }

  public getGroup(id: string): Group {
    return this.getRecentGroups().get(id);
  }

  public removeGroup(id: string) {
    const recentGroups: Map<string, Group> = this.getRecentGroups();
    recentGroups.delete(id);
    this.setRecentGroups(recentGroups);
  }

  public getRecentGroups(): Map<string, Group> {
    return this.stringToMap(localStorage.getItem(this.RECENT_GROUPS));
  }

  private setRecentGroups(map: Map<string, Group>) {
    localStorage.setItem(this.RECENT_GROUPS, this.mapToString(map));
  }

  private mapToString(map: Map<string, Group>) {
    return JSON.stringify(Array.from(map.entries()));
  }

  private stringToMap(str: string): Map<string, Group> {
    return new Map<string, Group>(JSON.parse(str));
  }
}
