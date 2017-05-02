import {Injectable} from '@angular/core';
import {CompensationResourceService} from '../resource/compensation-resource.service';
import {Observable} from 'rxjs/Observable';
import {Compensation} from '../model/compensation';
import {CrudOperation} from '../../shared/model/crud-operation';

@Injectable()
export class CompensationService {

  constructor(private compensationResource: CompensationResourceService) {
  }

  public getCompensations(groupId: string): Observable<Compensation[]> {
    if (!groupId) {
      return Observable.throw(new Error('Group ID is empty'));
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
    if (!groupId) {
      return Observable.throw(new Error('Group ID is empty'));
    } else if (!compensationId) {
      return Observable.throw(new Error('Compensation ID is empty'));
    }

    return this.compensationResource.getCompensation(groupId, compensationId)
      .map((dto: any) => {
        return Compensation.fromDto(dto);
      }).catch((error: Error) => {
        return Observable.throw(error);
      });
  }

  public saveCompensation(groupId: string, compenssation: Compensation, mode: CrudOperation): Observable<Compensation> {
    if (!groupId) {
      return Observable.throw(new Error('Group ID is empty'));
    } else if (mode === CrudOperation.EDIT && !compenssation.id) {
      return Observable.throw(new Error('Compensation ID is empty'));
    }

    let saveObs: Observable<any>;
    if (mode === CrudOperation.CREATE) {
      saveObs = this.compensationResource.createCompensation(groupId, compenssation);
    } else if (mode === CrudOperation.EDIT) {
      saveObs = this.compensationResource.updateExpense(groupId, compenssation);
    } else {
      return Observable.throw(new Error('Unsupported operation'));
    }

    return saveObs.map((dto: any) => {
      return Compensation.fromDto(dto);
    }).catch((error: Error) => {
      return Observable.throw(error);
    });
  }

  public deleteCompensation(groupId: string, compensationId: number): Observable<boolean> {
    if (!groupId) {
      return Observable.throw(new Error('Group ID is empty'));
    } else if (!compensationId) {
      return Observable.throw(new Error('Expense ID is empty'));
    }

    return this.compensationResource.deleteCompensation(groupId, compensationId);
  }
}
