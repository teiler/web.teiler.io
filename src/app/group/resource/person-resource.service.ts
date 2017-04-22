import {Injectable} from '@angular/core';
import {ResourceBase} from '../../shared/resource/resource-base';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PersonResourceService extends ResourceBase {

  constructor(http: Http) {
    super(http);
  }

  public createPerson(groupId: string, name: string): Observable<any> {
    const requestBody = {
      name
    };

    return this.post(this.getRequesturl(groupId, ''), requestBody)
      .map((response: Response) => {
        return response.json();
      }).catch((error: any) => {
        return Observable.throw(new Error(error.json().error));
      });
  }

  public updatePerson(groupId: string, personId: number, name: string): Observable<any> {
    const requestBody = {
      name
    };

    return this.put(this.getRequesturl(groupId, `/${personId}`), requestBody)
      .map((response: Response) => {
        return response.json();
      }).catch((error: any) => {
        return Observable.throw(new Error(error.json().error));
      });
  }

  public deletePerson(groupId: string, personId: number): Observable<boolean> {
    return this.delete(this.getRequesturl(groupId, `/${personId}`))
      .map(() => {
        return true;
      }).catch((error: any) => {
        return Observable.throw(new Error(error.json().error));
      });
  }

  private getRequesturl(groupId: string, endpoint: string): string {
    return `groups/${groupId}/people${endpoint}`;
  }

}
