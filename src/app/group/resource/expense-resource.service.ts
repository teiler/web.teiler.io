import {Injectable} from '@angular/core';
import {ResourceBase} from '../../shared/resource/resource-base';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Expense} from '../model/expense';
import {Profiteer} from '../model/profiteer';
import {CrudOperation} from '../../shared/model/crud-operation';

@Injectable()
export class ExpenseResourceService extends ResourceBase {

  private readonly apiUrl = 'groups/:groupId/expenses';

  constructor(http: Http) {
    super(http);
  }

  public getExpense(groupId: string, expenseId: number): Observable<any> {
    return this.get(this.getRequestUrl(groupId, `/${expenseId}`))
      .map((response: Response) => {
        return response.json();
      }).catch((error: any) => {
        return Observable.throw(new Error(error.json().error));
      });
  }

  public createExpense(groupId: string, expense: Expense): Observable<any> {
    const expenseDto = this.buildSaveExpenseDto(expense, CrudOperation.CREATE);

    return this.post(this.getRequestUrl(groupId, ''), expenseDto)
      .map((response: Response) => {
        return response.json();
      }).catch((error: any) => {
        return Observable.throw(new Error(error.json().error));
      });
  }

  public updateExpense(groupId: string, expense: Expense): Observable<any> {
    const expenseDto = this.buildSaveExpenseDto(expense, CrudOperation.EDIT);

    return this.put(this.getRequestUrl(groupId, `/${expense.id}`), expenseDto)
      .map((response: Response) => {
        return response.json();
      }).catch((error: any) => {
        return Observable.throw(new Error(error.json().error));
      });
  }

  private getRequestUrl(groupId: string, endpoint?: string) {
    return this.apiUrl.replace(':groupId', groupId) + endpoint;
  }

  private buildSaveExpenseDto(expense: Expense, mode: CrudOperation): any {
    const expenseDto: any = {
      title: expense.title,
      amount: expense.amount,
      payer: {
        id: expense.payer.id
      },
      profiteers: []
    };

    if (mode === CrudOperation.EDIT) {
      expenseDto.id = expense.id;
    }

    expense.profiteers.forEach((profiteer: Profiteer) => {
      if (profiteer.isActive) {
        expenseDto.profiteers.push({
          person: {
            id: profiteer.person.id
          },
          share: profiteer.share
        });
      }
    });

    return expenseDto;
  }

}
