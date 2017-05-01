import {Injectable} from '@angular/core';
import {ExpenseResourceService} from '../resource/expense-resource.service';
import {Observable} from 'rxjs/Observable';
import {Expense} from '../model/expense';
import {CrudOperation} from '../../shared/model/crud-operation';

@Injectable()
export class ExpenseService {

  constructor(private expenseResource: ExpenseResourceService) {
  }

  public getExpenses(groupId: string): Observable<Expense[]> {
    if (!groupId) {
      return Observable.throw(new Error('Group ID is empty'));
    }

    return this.expenseResource.getExpenses(groupId)
      .map((dto: any) => {
        const expenses: Expense[] = [];
        dto.forEach((expense: any) => {
          expenses.push(Expense.fromDto(expense));
        });
        return expenses;
      }).catch((error: Error) => {
        return Observable.throw(error);
      });
  }

  public getExpense(groupId: string, expenseId: number): Observable<Expense> {
    if (!groupId) {
      return Observable.throw(new Error('Group ID is empty'));
    } else if (!expenseId) {
      return Observable.throw(new Error('Expense ID is empty'));
    }

    return this.expenseResource.getExpense(groupId, expenseId)
      .map((dto: any) => {
        return Expense.fromDto(dto);
      }).catch((error: Error) => {
        return Observable.throw(error);
      });
  }

  public saveExpense(groupId: string, expense: Expense, mode: CrudOperation): Observable<Expense> {
    if (!groupId) {
      return Observable.throw(new Error('Group ID is empty'));
    } else if (mode === CrudOperation.EDIT && !expense.id) {
      return Observable.throw(new Error('Expense ID is empty'));
    }

    let saveObs: Observable<any>;
    if (mode === CrudOperation.CREATE) {
      saveObs = this.expenseResource.createExpense(groupId, expense);
    } else if (mode === CrudOperation.EDIT) {
      saveObs = this.expenseResource.updateExpense(groupId, expense);
    } else {
      return Observable.throw(new Error('Unsupported operation'));
    }

    return saveObs.map((dto: any) => {
      return Expense.fromDto(dto);
    }).catch((error: Error) => {
      return Observable.throw(error);
    });
  }
}
