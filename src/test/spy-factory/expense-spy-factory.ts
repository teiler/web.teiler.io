import {ExpenseTestData} from '../data/expense-test-data';
import {Observable} from 'rxjs/Observable';
import {Expense} from '../../app/group/model/expense';
/**
 * Created by Keerthikan on 07-May-17.
 */

export let expenseSpyFactory = (jasmine) => {
  const expenseSpy = jasmine.createSpyObj('expenseResourceService',
    ['getExpense', 'getExpenses', 'createExpense', 'updateExpense', 'deleteExpense']);

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

  expenseSpy.createExpense.and.callFake((groupId, expense: Expense) => {
    expense.id = 1;
    return Observable.of<any>(expense);
  });

  return expenseSpy;
};
