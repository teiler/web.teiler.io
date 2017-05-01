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

  public getExpenses(groupId: string): Observable<any> {
    return this.handleResponse(this.get(this.getRequestUrl(groupId, '')));
  }

  public getExpense(groupId: string, expenseId: number): Observable<any> {
    return this.handleResponse(this.get(this.getRequestUrl(groupId, `/${expenseId}`)));
  }

  public createExpense(groupId: string, expense: Expense): Observable<any> {
    const expenseDto = this.buildSaveExpenseDto(expense, CrudOperation.CREATE);
    return this.handleResponse(this.post(this.getRequestUrl(groupId, ''), expenseDto));
  }

  public updateExpense(groupId: string, expense: Expense): Observable<any> {
    const expenseDto = this.buildSaveExpenseDto(expense, CrudOperation.EDIT);

    return this.handleResponse(this.put(this.getRequestUrl(groupId, `/${expense.id}`), expenseDto));
  }

  private getRequestUrl(groupId: string, endpoint?: string) {
    return this.apiUrl.replace(':groupId', groupId) + endpoint;
  }

  private handleResponse(responseObs: Observable<Response>): Observable<any> {
    return responseObs.map((response: Response) => {
      return response.json();
    }).catch((error: any) => {
      return Observable.throw(new Error(error.json().error));
    });
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
      if (profiteer.isInvolved) {
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
