import {Injectable} from '@angular/core';
import {RequestOptions, Headers} from '@angular/http';

@Injectable()
export class ApiRequestOptions extends RequestOptions {

  constructor(args?: any) {
    super(args);

    if (!this.headers) {
      this.headers = new Headers();
    }
  }

  public merge(options?: any): RequestOptions {
    return new ApiRequestOptions(super.merge(options));
  }
}
