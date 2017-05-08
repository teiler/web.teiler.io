import {TestBed, inject} from '@angular/core/testing';

import {GroupStorageService} from './group-storage.service';
import {LogService} from '../../core/service/log.service';
import {GroupTestData} from '../../../test/data/group-test-data';
import {Group} from '../model/group';

describe('GroupStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GroupStorageService,
        LogService
      ]
    });
  });

  it('should be initialized', inject([GroupStorageService], (service: GroupStorageService) => {
    expect(service).toBeTruthy();
  }));

  it('should store a group', inject([GroupStorageService], (service: GroupStorageService) => {
    const group: Group = Group.fromDto(GroupTestData.hsrCrew);

    service.storeGroup(group);
    expect(service.getCurrentGroup()).toEqual(group);
    expect(service.getRecentGroups().length).toEqual(1);
    expect(service.getRecentGroup(group.id).name).toEqual(group.name);
  }));

  it('should remove the current group without deleting from recent groups',
    inject([GroupStorageService], (service: GroupStorageService) => {
      const group: Group = Group.fromDto(GroupTestData.hsrCrew);

      service.storeGroup(group);
      expect(service.getRecentGroups().length).toEqual(1);
      service.removeCurrentGroup();
      expect(service.getRecentGroups().length).toEqual(1);
      expect(service.getRecentGroup(group.id).name).toEqual(group.name);
    }));

  it('should remove the current group and clear traces', inject([GroupStorageService],
    (service: GroupStorageService) => {
      const group: Group = Group.fromDto(GroupTestData.hsrCrew);

      service.storeGroup(group);
      expect(service.getRecentGroups().length).toEqual(1);
      service.removeCurrentGroup(true);
      expect(service.getRecentGroups().length).toEqual(0);
    }));

});
