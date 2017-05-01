import { TestBed, inject } from '@angular/core/testing';

import { CompensationService } from './compensation.service';
import {CompensationResourceService} from '../resource/compensation-resource.service';

describe('CompensationService', () => {
  beforeEach(() => {
    const compensationSpy = jasmine.createSpyObj('compensationResourceService',
      ['getCompensation']);

    TestBed.configureTestingModule({
      providers: [
        CompensationService,
        {provide: CompensationResourceService, useValue: compensationSpy}
      ]
    });
  });

  it('should ...', inject([CompensationService], (service: CompensationService) => {
    expect(service).toBeTruthy();
  }));
});
