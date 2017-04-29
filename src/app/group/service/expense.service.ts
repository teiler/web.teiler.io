import {Injectable} from '@angular/core';
import {ExpenseResourceService} from '../resource/expense-resource.service';
import {Observable} from 'rxjs/Observable';
import {Expense} from '../model/expense';

@Injectable()
export class ExpenseService {

  constructor(private expenseResource: ExpenseResourceService) {
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
}
