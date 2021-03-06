import {Component, OnInit} from '@angular/core';
import {GroupService} from '../../service/group.service';
import {ActivatedRoute} from '@angular/router';
import {Group} from '../../model/group';
import {Compensation} from '../../model/compensation';
import {LogService, NavigationService} from 'app/core';
import {CompensationService} from '../../service/compensation.service';
import {CrudOperation} from '../../../shared/model/crud-operation';

@Component({
  selector: 'tylr-suggest-payments',
  templateUrl: './suggest-payments.component.html',
  styleUrls: ['./suggest-payments.component.scss']
})
export class SuggestPaymentsComponent implements OnInit {
  public group: Group;
  public compensations: Compensation[] = [];
  public message: string;
  public isPaid: boolean[] = [];
  public helpHidden = true;

  constructor(private route: ActivatedRoute,
              private groupService: GroupService,
              private logService: LogService,
              private navigationService: NavigationService,
              private compensationService: CompensationService) {
  }

  ngOnInit() {
    this.group = this.route.snapshot.data['group'];
    this.loadSuggestedPayments();
  }

  private loadSuggestedPayments() {
    this.groupService.getSuggestedPayments(this.group.id)
      .subscribe(
        (compensations: Compensation[]) => this.compensations = compensations,
        (error: Error) => this.logService.error(error)
      );
  }

  public pay(index: number) {
    const compensation = this.compensations[index];
    this.compensationService.saveCompensation(this.group.id, compensation, CrudOperation.CREATE)
      .map(() => {
        this.isPaid[index] = true;
      })
      .delay(2000)
      .subscribe(
        () => {
          this.compensations.splice(index, 1);
          this.isPaid.splice(index, 1);
        },
        (error: Error) => this.message = error.message
      );
  }

  public  onCancel() {
    this.navigationService.goBack();
  }

  public toggleHelp() {
    this.helpHidden = !this.helpHidden;
  }
}
