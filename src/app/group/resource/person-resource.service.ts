import {Injectable} from '@angular/core';
import {ResourceBase} from '../../shared/resource/resource-base';
import {Http} from '@angular/http';

@Injectable()
export class PersonResourceService extends ResourceBase {

  constructor(http: Http) {
    super(http);
  }

}
