import {Injectable} from "@angular/core";
import {CompensationResourceService} from "../resource/compensation-resource.service";
import {Observable} from "rxjs/Observable";
import {Compensation} from "../model/compensation";
import {CrudOperation} from "../../shared/model/crud-operation";
import {ValidationUtil} from "../../shared/util/validation-util";
import {TylrWebError} from "../../shared/model/tylr-web-error";

@Injectable()
export class CompensationService {

  constructor(private compensationResource: CompensationResourceService) {
  }

  public getCompensations(groupId: string): Observable<Compensation[]> {
    try {
      ValidationUtil.validateGroupId(groupId);
    } catch (error) {
      return Observable.throw(error);
    }

    return this.compensationResource.getCompensations(groupId)
      .map((dto: any) => {
        const compensations: Compensation[] = [];
        dto.forEach((compensation: any) => {
          compensations.push(Compensation.fromDto(compensation));
        });
        return compensations;
      }).catch((error: Error) => {
        return Observable.throw(error);
      });
  }

  public getCompensation(groupId: string, compensationId: number): Observable<Compensation> {
    try {
      ValidationUtil.validateGroupId(groupId);
      ValidationUtil.validateCompensationId(compensationId);
    } catch (error) {
      return Observable.throw(error);
    }

    return this.compensationResource.getCompensation(groupId, compensationId)
      .map((dto: any) => {
        return Compensation.fromDto(dto);
      }).catch((error: Error) => {
        return Observable.throw(error);
      });
  }

  public saveCompensation(groupId: string, compensation: Compensation, mode: CrudOperation): Observable<Compensation> {
    try {
      ValidationUtil.validateGroupId(groupId);

      if (mode === CrudOperation.EDIT) {
        ValidationUtil.validateCompensationId(compensation.id);
      }
    } catch (error) {
      return Observable.throw(error);
    }

    let saveObs: Observable<any>;
    if (mode === CrudOperation.CREATE) {
      saveObs = this.compensationResource.createCompensation(groupId, compensation);
    } else if (mode === CrudOperation.EDIT) {
      saveObs = this.compensationResource.updateExpense(groupId, compensation);
    } else {
      return Observable.throw(new Error(TylrWebError.UNSUPPORTED_OPERATION));
    }

    return saveObs.map((dto: any) => {
      return Compensation.fromDto(dto);
    }).catch((error: Error) => {
      return Observable.throw(error);
    });
  }

  public deleteCompensation(groupId: string, compensationId: number): Observable<boolean> {
    try {
      ValidationUtil.validateGroupId(groupId);
      ValidationUtil.validateCompensationId(compensationId);
    } catch (error) {
      return Observable.throw(error);
    }

    return this.compensationResource.deleteCompensation(groupId, compensationId);
  }
}
