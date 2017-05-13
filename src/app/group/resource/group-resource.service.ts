import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ResourceBase} from 'app/shared';
import {TylrErrorService} from '../../core/service/tylr-error.service';

@Injectable()
export class GroupResourceService extends ResourceBase {

  private readonly apiUrl = 'groups';

  constructor(http: Http,
              tylrErrorService: TylrErrorService) {
    super(http, tylrErrorService);
  }

  public createGroup(name: string): Observable<any> {
    const requestBody = {
      name
    };

    return this.post(this.getRequesturl(''), requestBody)
      .map(super.handleApiJsonResponse.bind(this))
      .catch(super.handleApiError.bind(this));
  }

  public getGroup(id: string): Observable<any> {
    return this.get(this.getRequesturl(`/${id}`))
      .map(super.handleApiJsonResponse.bind(this))
      .catch(super.handleApiError.bind(this));
  }

  public updateGroup(id: string, name: string, currency: string): Observable<any> {
    const requestBody = {
      name,
      currency
    };

    return this.put(this.getRequesturl(`/${id}`), requestBody)
      .map(super.handleApiJsonResponse.bind(this))
      .catch(super.handleApiError.bind(this));
  }

  public deleteGroup(id: string): Observable<boolean> {
    return this.delete(this.getRequesturl(`/${id}`))
      .map(() => {
        return true;
      }).catch(super.handleApiError.bind(this));
  }

  public getDebts(id: string): Observable<any> {
    return this.get(this.getRequesturl(`/${id}/debts`))
      .map(super.handleApiJsonResponse.bind(this))
      .catch(super.handleApiError.bind(this));
  }

  public getSuggestedPayments(id: string): Observable<any> {
    return this.get(this.getRequesturl(`/${id}/settleup`))
      .map(super.handleApiJsonResponse.bind(this))
      .catch(super.handleApiError.bind(this));
  }

  private getRequesturl(endpoint: string): string {
    return `${this.apiUrl}${endpoint}`;
  }
}
