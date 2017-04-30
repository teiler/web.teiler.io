import {Component, OnInit} from '@angular/core';
import {Group} from '../../model/group';
import {ActivatedRoute} from '@angular/router';
import {CompensationService} from '../../service/compensation.service';
import {CrudOperation} from '../../../shared/model/crud-operation';
import {Compensation} from '../../model/compensation';
import {NavigationService} from '../../../core/service/navigation.service';
import {Profiteer} from '../../model/profiteer';
import {Person} from '../../model/person';

@Component({
  selector: 'tylr-compensation',
  templateUrl: './compensation.component.html',
  styleUrls: ['./compensation.component.scss']
})
export class CompensationComponent implements OnInit {
  private MODE: CrudOperation;
  public group: Group;
  public compensation: Compensation;

  constructor(private route: ActivatedRoute,
              private compensationService: CompensationService,
              private navigationService: NavigationService) {
    this.MODE = this.route.snapshot.paramMap.has('compensationId') ?
      CrudOperation.EDIT : CrudOperation.CREATE;
  }


  ngOnInit() {
    this.group = this.route.snapshot.data['group'];
    switch (this.MODE) {
      case CrudOperation.CREATE: {
        this.compensation = new Compensation(null, this.group.people[0], 0, this.group.people[1]);
        break;
      }
      case CrudOperation.EDIT: {
        const expenseId = this.route.snapshot.paramMap.get('expenseId');
        this.compensationService.getCompensation(this.group.id, parseInt(expenseId, 10))
          .subscribe(
            (compensation: Compensation) => {
              this.compensation = compensation;
            },
            (error: any) => console.log(error)
          );
        break;
      }
      default: {
        throw new Error('Unsupported operation');
      }
    }
  }

  public onTotalAmountChanged(value: number) {
    const totalValue = value ? value : 0;
    this.compensation.amountDecimal = totalValue;
  }

  public toggleIsInvolved(event: Event, person: Person) {
    event.stopPropagation();
    this.compensation.profiteer = person;
  }

  public onPayerChanged(payerId: string) {
    this.compensation.payer = this.group.getPeopleAsMap().get(parseInt(payerId, 10));
  }
}
