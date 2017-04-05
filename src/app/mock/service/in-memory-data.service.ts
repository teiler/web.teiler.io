import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {ResponseOptions, RequestMethod} from '@angular/http';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb(): {} {
    const groups = [
      {
        id: 'abcd',
        name: 'HSR',
        people: [
          {
            id: 4,
            name: 'Person C'
          },
          {
            id: 5,
            name: 'Person D'
          }
        ],
        'currency': 'chf'
      },
      {
        id: 'asdf',
        name: 'Engineering Project',
        people: [
          {
            id: 1,
            name: 'Person A'
          },
          {
            id: 2,
            name: 'Person B'
          }
        ],
        'currency': 'chf'
      }
    ];
    return {groups};
  }

  // intercept response from the default HTTP method handlers
  responseInterceptor(response: ResponseOptions, reqInfo: RequestInfo) {
    const body = JSON.stringify(response.body);
    if (body.indexOf('data') !== -1) {
      response.body = JSON.parse(body).data;
    }
    return response;
  }
}
