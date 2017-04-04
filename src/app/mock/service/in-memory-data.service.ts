import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';

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
}
