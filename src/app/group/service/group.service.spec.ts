import {GroupService} from './group.service';
import {inject, TestBed} from '@angular/core/testing';
import {GroupResourceService} from '../resource/group-resource.service';
import {Observable} from 'rxjs/Rx';
import * as assert from 'assert';
import {Group} from '../model/group';

const groupDto = {
  'id': '4h43pgmi',
  'name': 'Alpha',
  'currency': 'chf',
  'people': [
    {
      'id': 3,
      'name': 'Person A',
      'update-time': '2017-04-06T20:07:01.128Z',
      'create-time': '2017-04-06T20:07:01.128Z'
    },
    {
      'id': 4,
      'name': 'Person B',
      'update-time': '2017-04-06T20:10:14.232Z',
      'create-time': '2017-04-06T20:10:14.232Z'
    }
  ],
  'update-time': '2017-04-06T20:00:41.504Z',
  'create-time': '2017-04-06T20:00:41.504Z'
};

describe('GroupService', () => {
  beforeEach(() => {
    const spy = jasmine.createSpyObj('groupResourceService',
      ['createGroup', 'getGroup', 'deleteGroup']);

    spy.createGroup.and.callFake((name) => {
      return Observable.of<any>({id: '1234', name});
    });

    // DAL should return a Group DTO
    spy.getGroup.and.callFake((id) => {
      const group = JSON.parse(JSON.stringify(groupDto));
      group.id = id;
      return Observable.of<any>(group);
    });

    spy.deleteGroup.and.callFake((id) => Observable.of<boolean>(true));

    TestBed.configureTestingModule({
      providers: [
        GroupService,
        {provide: GroupResourceService, useValue: spy}
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


