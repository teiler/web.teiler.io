import {TestBed, inject} from '@angular/core/testing';

import {ExpenseService} from './expense.service';
import {ExpenseResourceService} from '../resource/expense-resource.service';
import {ExpenseTestData} from '../../../test/data/expense-data';
import {Observable} from 'rxjs/Observable';

describe('ExpenseService', () => {
  beforeEach(() => {
    const expenseSpy = jasmine.createSpyObj('expenseResourceService',
      ['getExpense', 'getExpenses']);

    // DAL should return a Expense DTO
    expenseSpy.getExpense.and.callFake((groupId, expenseId) => {
      const expense = ExpenseTestData.hsrCrewExpense;
      expense.id = expenseId;
      return Observable.of<any>(expense);
    });

    expenseSpy.getExpenses.and.callFake((groupId) => {
      const expenses = [];
      expenses.push(ExpenseTestData.hsrCrewExpense);
      return Observable.of<any>(expenses);
    });

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

  it('should get the expense', inject([ExpenseService], (service: ExpenseService) => {
    service.getExpense('1234', 1).subscribe(
      (expense) => {
        expect(expense.id).toEqual(1);
      }
    );
  }));

  it('should get the expense array', inject([ExpenseService], (service: ExpenseService) => {
    service.getExpenses('1234').subscribe(
      (expenses) => {
        expect(expenses).toBeTruthy();
        expect(expenses[0].title).toBeTruthy();
      }
    );
  }));
});
