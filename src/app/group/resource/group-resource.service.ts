import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
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
        const result = response.json();
        console.log('resource service: api response - ', result);
        return Observable.of<any>(result);
      }).catch((error: any) => {
        return Observable.of<any>(error);
      });
  }

  public getGroup(id: string): Observable<any> {
    const headers = new Headers({
      'X-Teiler-GroupID': id
    });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.getRequesturl('group'), options)
      .map((response: Response) => {
        const result = response.json();
        console.log('resource service: api response - ', result);
        return Observable.of<any>(result);
      }).catch((error: any) => {
        return Observable.throw(new Error(error.json().error));
      });
  }

  private getRequesturl(endpoint: string): string {
    return `${this.apiUrl}${endpoint}`;
  }

}
