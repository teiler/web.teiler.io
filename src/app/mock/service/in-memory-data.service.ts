import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {ResponseOptions, RequestMethod} from '@angular/http';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb(): {} {
    const groups = [
      {
        id: '4h43pgmi',
        name: 'Alpha',
        currency: 'chf',
        'update-time': '2017-04-06T20:00:41.504Z',
        'create-time': '2017-04-06T20:00:41.504Z',
        people: [
          {
            id: 4,
            name: 'Person C',
            groupId: '4h43pgmi',
            'update-time': '2017-04-06T20:00:41.504Z',
            'create-time': '2017-04-06T20:00:41.504Z'
          },
          {
            id: 5,
            name: 'Person D',
            groupId: '4h43pgmi',
            'update-time': '2017-04-06T20:00:41.504Z',
            'create-time': '2017-04-06T20:00:41.504Z'
          }
        ]
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
      },
      {
        id: '3hj593m',
        name: 'HSR-Crew',
        currency: 'chf',
        'update-time': '2017-04-06T20:00:41.504Z',
        'create-time': '2017-04-06T20:00:41.504Z',
        people: [
          {
            id: 1,
            name: 'Lukas',
            groupId: '4h43pgmi',
            'update-time': '2017-04-06T20:00:41.504Z',
            'create-time': '2017-04-06T20:00:41.504Z'
          },
          {
            id: 2,
            name: 'Patrick',
            groupId: '4h43pgmi',
            'update-time': '2017-04-06T20:00:41.504Z',
            'create-time': '2017-04-06T20:00:41.504Z'
          },
          {
            id: 3,
            name: 'Kirthi',
            groupId: '4h43pgmi',
            'update-time': '2017-04-06T20:00:41.504Z',
            'create-time': '2017-04-06T20:00:41.504Z'
          },
          {
            id: 4,
            name: 'Demian',
            groupId: '4h43pgmi',
            'update-time': '2017-04-06T20:00:41.504Z',
            'create-time': '2017-04-06T20:00:41.504Z'
          }
        ]
      },
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
