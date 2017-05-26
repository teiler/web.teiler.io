/**
 * Created by Keerthikan on 07-May-17.
 */

import {CompensationTestData} from '../data/compensation-test-data';
import {Observable} from 'rxjs/Observable';

export let compensationSpyFactory = (jasmine) => {
  const compensationSpy = jasmine.createSpyObj('compensationResourceService',
    ['getCompensation']);

  // DAL should return a Expense DTO
  compensationSpy.getCompensation.and.callFake((groupId, compensationId) => {
    const compensation = CompensationTestData.compensation;
    compensation.id = compensationId;
    return Observable.of<any>(compensation);
  });

  return compensationSpy;
};
