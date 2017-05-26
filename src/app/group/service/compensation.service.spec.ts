import {inject, TestBed} from '@angular/core/testing';
import {CompensationService} from './compensation.service';
import {CompensationResourceService} from '../resource/compensation-resource.service';
import {compensationSpyFactory} from '../../../test/spy-factory/compensation-spy-factory';
import {Compensation} from '../model/compensation';
import {CompensationTestData} from '../../../test/data/compensation-test-data';
import {CrudOperation} from '../../shared/model/crud-operation';
import * as assert from 'assert';

describe('CompensationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CompensationService,
        {provide: CompensationResourceService, useValue: compensationSpyFactory(jasmine)}
      ]
    });
  });

  it('should be initialized', inject([CompensationService], (service: CompensationService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the compensation', inject([CompensationService], (service: CompensationService) => {
    service.getCompensation('1234', 1).subscribe(
      (compensation) => {
        expect(compensation.id).toEqual(1);
      }
    );
  }));

  it('should not save the compensation', inject([CompensationService], (service: CompensationService) => {
    const compensation: Compensation = Compensation.fromDto(CompensationTestData.compensation);
    compensation.id = null;
    service.saveCompensation('1234', compensation, CrudOperation.EDIT).subscribe(
      (group) => {
        assert(false, 'exception expected');
      },
      (error) => {
        expect(error.message).toEqual('Compensation ID is empty');
      });
  }));
});
