import { TestBed, inject } from '@angular/core/testing';

import { GroupStorageService } from './group-storage.service';
import {LogService} from '../../core/service/log.service';

describe('GroupStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GroupStorageService,
        LogService
      ]
    });
  });

  it('should ...', inject([GroupStorageService], (service: GroupStorageService) => {
    expect(service).toBeTruthy();
  }));
});
