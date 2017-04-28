import {Injectable} from '@angular/core';
import {ResourceBase} from '../../shared/resource/resource-base';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

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

  private getRequestUrl(groupId: string, endpoint?: string) {
    return this.apiUrl.replace(':groupId', groupId) + endpoint;
  }

}
