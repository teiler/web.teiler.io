import {Component, OnInit} from '@angular/core';
import {GroupService} from '../../service/group.service';
import {ActivatedRoute} from '@angular/router';
import {Group} from '../../model/group';
import {Compensation} from '../../model/compensation';
import {LogService} from '../../../core/service/log.service';

@Component({
  selector: 'tylr-suggest-payments',
  templateUrl: './suggest-payments.component.html',
  styleUrls: ['./suggest-payments.component.scss']
})
export class SuggestPaymentsComponent implements OnInit {
  public group: Group;
  public compensations: Compensation[] = [];

  constructor(private route: ActivatedRoute,
              private groupService: GroupService,
              private logService: LogService) {
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
}
