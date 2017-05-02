import {Injectable} from '@angular/core';
import {ResourceBase} from '../../shared/resource/resource-base';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {TylrErrorService} from '../../core/service/tylr-error.service';

@Injectable()
export class PersonResourceService extends ResourceBase {

  constructor(http: Http,
              tylrErrorService: TylrErrorService) {
    super(http, tylrErrorService);
  }

  public createPerson(groupId: string, name: string): Observable<any> {
    const requestBody = {
      name
    };

    return this.post(this.getRequesturl(groupId, ''), requestBody)
      .map((response: Response) => {
        return response.json();
      }).catch(this.handleApiError.bind(this));
  }

  public updatePerson(groupId: string, personId: number, name: string): Observable<any> {
    const requestBody = {
      name
    };

    return this.put(this.getRequesturl(groupId, `/${personId}`), requestBody)
      .map((response: Response) => {
        return response.json();
      }).catch(this.handleApiError.bind(this));
  }

  public deletePerson(groupId: string, personId: number): Observable<boolean> {
    return this.delete(this.getRequesturl(groupId, `/${personId}`))
      .map(() => {
        return true;
      }).catch(this.handleApiError.bind(this));
  }

  private getRequesturl(groupId: string, endpoint: string): string {
    return `groups/${groupId}/people${endpoint}`;
  }

}
