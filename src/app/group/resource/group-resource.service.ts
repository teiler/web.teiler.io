import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class GroupResourceService {

  private readonly apiUrl = 'https://api.teiler.io/v1/';

  constructor(private http: Http) {
  }

  public createGroup(name: string): Observable<any> {

    const requestBody = {
      name
    };

    return this.http.post(this.getRequesturl('group'), requestBody)
      .map((response: Response) => {
        console.log('resource service: api response - ', response);
        return Observable.of<any>(response.json());
      }).catch((error: any) => {
        return Observable.of<any>(error);
      });
  }

  private getRequesturl(endpoint: string): string {
    return `${this.apiUrl}${endpoint}`;
  }

}
