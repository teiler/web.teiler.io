import {GroupService} from './group.service';
import {inject, TestBed} from '@angular/core/testing';
import {GroupResourceService, PersonResourceService} from '../resource/';
import {Observable} from 'rxjs/Rx';
import {GroupTestData} from '../../../test/data/index';
import * as assert from 'assert';

describe('GroupService', () => {
  beforeEach(() => {
    const groupSpy = jasmine.createSpyObj('groupResourceService',
      ['createGroup', 'getGroup', 'deleteGroup']);

    const personSpy = jasmine.createSpyObj('personGroupService',
      ['createPerson', 'updatePerson', 'deletePerson']);

    groupSpy.createGroup.and.callFake((name) => {
      return Observable.of<any>({id: '1234', name});
    });

    // DAL should return a Group DTO
    groupSpy.getGroup.and.callFake((id) => {
      const group = GroupTestData.group;
      group.id = id;
      return Observable.of<any>(group);
    });

    groupSpy.deleteGroup.and.callFake((id) => Observable.of<boolean>(true));

    TestBed.configureTestingModule({
      providers: [
        GroupService,
        {provide: GroupResourceService, useValue: groupSpy},
        {provide: PersonResourceService, useValue: personSpy}
      ]
    });
  });

  it('should create a group', inject([GroupService], (service: GroupService) => {
    expect(service).toBeTruthy();

    service.createGroup('test').subscribe(
      (groupModel) => {
        expect(groupModel.name).toEqual('test');
      }
    );
  }));

  it('should get a group', inject([GroupService], (service: GroupService) => {
    expect(service).toBeTruthy();

    service.getGroup('1234').subscribe(
      (group) => {
        expect(group.id).toEqual('1234');
        expect(group.people.length).toEqual(2);
      }
    );
  }));

  it('should not get a group', inject([GroupService], (service: GroupService) => {
    expect(service).toBeTruthy();

    service.getGroup(null).subscribe(
      (group) => {
        assert(false, 'exception expected');
      },
      (error) => {
        expect(error.message).toEqual('Group ID is empty');
      }
    );
  }));

  it('should not delete a group', inject([GroupService], (service: GroupService) => {
    expect(service).toBeTruthy();

    service.deleteGroup(null).subscribe(
      (group) => {
        assert(false, 'exception expected');
      },
      (error) => {
        expect(error.message).toEqual('Group ID is empty');
      }
    );
  }));
});
