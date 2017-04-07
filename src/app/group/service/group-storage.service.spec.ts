import { TestBed, inject } from '@angular/core/testing';

import { GroupStorageService } from './group-storage.service';

describe('GroupStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupStorageService]
    });
  });

  it('should ...', inject([GroupStorageService], (service: GroupStorageService) => {
    expect(service).toBeTruthy();
  }));
});
