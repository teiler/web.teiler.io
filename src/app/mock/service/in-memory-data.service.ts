import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {ResponseOptions} from '@angular/http';
import {GroupTestData} from '../../../test/data/index';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb(): {} {
    const groups = [
      GroupTestData.group,
      GroupTestData.hsrCrew
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
