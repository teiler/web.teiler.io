/**
 * Created by Keerthikan on 07-May-17.
 */

import {Compensation} from './compensation';
import {CompensationTestData} from '../../../test/data/compensation-test-data';

describe('Compensation', () => {
  beforeEach(() => {
    this.compensation = Compensation.fromDto(CompensationTestData.compensation);
  });

  it('should be initialized from Dto', () => {
    const dto = CompensationTestData.compensation;
    expect(this.compensation).toBeTruthy();
    expect(this.compensation.payer.name).toBeTruthy();
    expect(this.compensation.profiteer.name).toBeTruthy();
  });

  it('should be valid', () => {
    expect(this.compensation.isValid()).toBeTruthy();
  });
});
