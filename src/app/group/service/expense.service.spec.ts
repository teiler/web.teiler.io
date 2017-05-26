import {inject, TestBed} from '@angular/core/testing';

import {ExpenseService} from './expense.service';
import {ExpenseResourceService} from '../resource/expense-resource.service';
import {CrudOperation} from '../../shared/model/crud-operation';
import {expenseSpyFactory} from '../../../test/spy-factory/expense-spy-factory';
import {Expense} from '../model/expense';
import {ExpenseTestData} from '../../../test/data/expense-test-data';

describe('ExpenseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExpenseService,
        {provide: ExpenseResourceService, useValue: expenseSpyFactory(jasmine)}
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

  it('should save an expense', inject([ExpenseService], (service: ExpenseService) => {
    const expense: Expense = Expense.fromDto(ExpenseTestData.hsrCrewExpense);
    expense.id = null;
    service.saveExpense('1234', expense, CrudOperation.CREATE).subscribe(
      (expenseSaved) => {
        expect(expenseSaved).toBeTruthy();
        expect(expenseSaved.id).toBeTruthy();
        expect(expenseSaved.title).toBeTruthy();
      }
    );
  }));
});
