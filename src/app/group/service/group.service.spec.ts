import {GroupService} from './group.service';
import {inject, TestBed} from '@angular/core/testing';
import {GroupResourceService} from '../resource/group-resource.service';
import {Observable} from 'rxjs/Rx';
import * as assert from 'assert';

describe('GroupService', () => {
  beforeEach(() => {
    const spy = jasmine.createSpyObj('groupResourceService',
      ['createGroup', 'getGroup']);

    spy.createGroup.and.callFake((name) => {
      return Observable.of<any>({'group-uuid': 1234, name});
    });

    spy.getGroup.and.callFake((id) => {
      return Observable.of<any>({'group-uuid': id, name: 'test'});
    });

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
      (groupModel) => {
        expect(groupModel['group-uuid']).toEqual('1234');
      }
    );
  }));

  it('should not get a group', inject([GroupService], (service: GroupService) => {
    expect(service).toBeTruthy();

    service.getGroup(null).subscribe(
      (groupModel) => {
        console.log(groupModel);
        assert(false, 'exception expected');
      },
      (error) => {
        expect(error.message).toEqual('Group ID is empty');
      }
    );
  }));
});
