import {Injectable} from '@angular/core';
import {ResourceBase} from '../../shared/resource/resource-base';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Compensation} from '../model/compensation';
import {CrudOperation} from '../../shared/model/crud-operation';
import {TylrErrorService} from '../../core/service/tylr-error.service';

@Injectable()
export class CompensationResourceService extends ResourceBase {
  private readonly apiUrl = 'groups/:groupId/compensations';

  constructor(http: Http,
              tylrErrorService: TylrErrorService) {
    super(http, tylrErrorService);
  }

  public getCompensations(groupId: string): Observable<any> {
    return this.handleResponse(this.get(this.getRequestUrl(groupId, '')));
  }

  public getCompensation(groupId: string, compensationId: number): Observable<any> {
    return this.handleResponse(this.get(this.getRequestUrl(groupId, `/${compensationId}`)));
  }

  public createCompensation(groupId: string, compensation: Compensation): Observable<any> {
    const compensationDto = this.buildSaveCompensationDto(compensation, CrudOperation.CREATE);
    return this.handleResponse(this.post(this.getRequestUrl(groupId, ''), compensationDto));
  }

  public updateExpense(groupId: string, compensation: Compensation): Observable<any> {
    const compensationDto = this.buildSaveCompensationDto(compensation, CrudOperation.EDIT);
    return this.handleResponse(this.put(this.getRequestUrl(groupId, `/${compensation.id}`), compensationDto));
  }

  public deleteCompensation(groupId: string, compensationId: number): Observable<boolean> {
    return this.delete(this.getRequestUrl(groupId, `/${compensationId}`))
      .map(() => {
        return true;
      }).catch(this.handleApiError.bind(this));
  }

  private getRequestUrl(groupId: string, endpoint?: string) {
    return this.apiUrl.replace(':groupId', groupId) + endpoint;
  }

  private handleResponse(responseObs: Observable<Response>): Observable<any> {
    return responseObs.map((response: Response) => {
      return response.json();
    }).catch(this.handleApiError.bind(this));
  }

  private buildSaveCompensationDto(compensation: Compensation, mode: CrudOperation): any {
    const compensationDto: any = {
      amount: compensation.amount,
      payer: {
        id: compensation.payer.id
      },
      profiteer: {
        id: compensation.profiteer.id
      }
    };

    if (mode === CrudOperation.EDIT) {
      compensationDto.id = compensation.id;
    }

    return compensationDto;
  }

}
