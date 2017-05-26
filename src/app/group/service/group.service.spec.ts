import {GroupService} from "./group.service";
import {inject, TestBed} from "@angular/core/testing";
import {GroupResourceService, PersonResourceService} from "../resource/";
import * as assert from "assert";
import {groupSpyFactory} from "../../../test/spy-factory/group-spy-factory";
import {personSpyFactory} from "../../../test/spy-factory/person-spy-factory";

describe('GroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GroupService,
        {provide: GroupResourceService, useValue: groupSpyFactory(jasmine)},
        {provide: PersonResourceService, useValue: personSpyFactory(jasmine)}
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
