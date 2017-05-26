import {Injectable} from "@angular/core";
import {TylrApiError} from "../../shared/model/tylr-api-error";

@Injectable()
export class TylrErrorService {

  constructor() {
  }

  public getApiErrorMessage(type: string) {
    if (type) {
      if (TylrApiError.hasOwnProperty(type)) {
        return TylrApiError[type];
      } else {
        return type;
      }
    } else {
      return 'Something went wrong';
    }
  }

}
