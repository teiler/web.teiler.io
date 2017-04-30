import {Component, OnInit} from '@angular/core';
import {Group} from '../../model/group';
import {ActivatedRoute} from '@angular/router';
import {NavigationService} from '../../../core/service/navigation.service';
import {GroupStorageService} from '../../service/group-storage.service';
import {Subscription} from 'rxjs/Subscription';
import {ExpenseService} from '../../service/expense.service';
import {Expense} from '../../model/expense';

@Component({
  selector: 'tylr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public group: Group;
  public expenses: Expense[] = [];

  constructor(private route: ActivatedRoute,
              private navigationService: NavigationService,
              private expenseService: ExpenseService) {
  }

  ngOnInit() {
    // initialize components (probably a loading icon)
    this.group = this.route.snapshot.data['group'];
    if (!this.group) {
      this.navigationService.goHome();
      return;
    }

    this.expenseService.getExpenses(this.group.id)
      .subscribe(
        (expenses: Expense[]) => {
          this.expenses = expenses;
        });
  }
}
