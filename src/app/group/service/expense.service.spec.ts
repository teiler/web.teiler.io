import {TestBed, inject} from '@angular/core/testing';

import {ExpenseService} from './expense.service';
import {ExpenseResourceService} from '../resource/expense-resource.service';

describe('ExpenseService', () => {
  beforeEach(() => {
    const expenseSpy = jasmine.createSpyObj('expenseResourceService',
      ['getExpense']);

    TestBed.configureTestingModule({
      providers: [
        ExpenseService,
        {provide: ExpenseResourceService, useValue: expenseSpy}
      ]
    });
  });

  it('should be initialized', inject([ExpenseService], (service: ExpenseService) => {
    expect(service).toBeTruthy();
  }));
});
