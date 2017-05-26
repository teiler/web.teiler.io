import {Headers, Http, RequestOptionsArgs, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";

import {environment} from "../../../environments/environment";
import {ApiRequestOptions} from "../model";
import {TylrErrorService} from "../../core/service/tylr-error.service";

export abstract class ResourceBase {
  static JSON_HEADERS: RequestOptionsArgs = {headers: new Headers({'content-type': 'application/json'})};
  private readonly requestOptions: ApiRequestOptions = new ApiRequestOptions(ResourceBase.JSON_HEADERS);

  constructor(private http: Http,
              private tylrErrorService: TylrErrorService) {
  }

  protected get<T>(path: string): Observable<Response> {
    return this.http.get(environment.serverBaseUrl + path);
  }

  protected post<T>(path: string, dto: any, options?: any): Observable<Response> {
    return this.http.post(
      environment.serverBaseUrl + path,
      JSON.stringify(dto),
      this.requestOptions.merge(options));
  }

  protected put<T>(path: string, dto: any, options?: any): Observable<Response> {
    return this.http.put(
      environment.serverBaseUrl + path,
      JSON.stringify(dto),
      this.requestOptions.merge(options));
  }

  protected delete<T>(path: string): Observable<Response> {
    return this.http.delete(environment.serverBaseUrl + path);
  }

  protected handleApiJsonResponse(response: Response): any {
    return response.json();
  }

  // caller should bind `this` to the function
  protected handleApiError(error: any) {
    const message = this.tylrErrorService.getApiErrorMessage(error.json().error);
    return Observable.throw(new Error(message));
  }
}
