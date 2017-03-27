import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class GroupResourceService {

  constructor(private http: Http) {
  }

  public createGroup(name: string): Observable<string> {
    console.log('resource service: should return GroupDTO', name);
    return Observable.of<string>(`Create ${name}: waiting for tylr-api`);
  }

}
