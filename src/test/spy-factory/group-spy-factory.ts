import {Observable} from "rxjs/Observable";
import {GroupTestData} from "../data/group-test-data";
/**
 * Created by Keerthikan on 07-May-17.
 */

export let groupSpyFactory = (jasmine) => {
  const groupSpy = jasmine.createSpyObj('groupResourceService',
    ['createGroup', 'getGroup', 'deleteGroup']);

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

  return groupSpy;
};
