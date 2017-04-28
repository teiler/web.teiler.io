import { TestBed, inject } from '@angular/core/testing';

import { ExpenseService } from './expense.service';

describe('ExpenseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpenseService]
    });
  });

  it('should ...', inject([ExpenseService], (service: ExpenseService) => {
    expect(service).toBeTruthy();
  }));
});
