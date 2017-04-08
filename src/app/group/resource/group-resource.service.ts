import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ResourceBase} from 'app/shared';
import {Group} from '../model/group';

@Injectable()
export class GroupResourceService extends ResourceBase {

  private readonly apiUrl = 'groups';

  constructor(http: Http) {
    super(http);
  }

  public createGroup(name: string): Observable<any> {
    const requestBody = {
      name
    };

    return this.post(this.getRequesturl(''), requestBody)
      .map((response: Response) => {
        return response.json();
      }).catch((error: any) => {
        return Observable.throw(new Error(error.json().error));
      });
  }

  public getGroup(id: string): Observable<any> {
    return this.get(this.getRequesturl(`/${id}`))
      .map((response: Response) => {
        return response.json();
      }).catch((error: any) => {
        return Observable.throw(new Error(error.json().error));
      });
  }

  private getRequesturl(endpoint: string): string {
    return `${this.apiUrl}${endpoint}`;
  }

}
