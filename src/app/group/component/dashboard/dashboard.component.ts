import {Component, OnInit} from '@angular/core';
import {Group} from '../../model/group';
import {ActivatedRoute} from '@angular/router';
import {NavigationService} from '../../../core/service/navigation.service';
import {GroupStorageService} from '../../service/group-storage.service';
import {Subscription} from 'rxjs/Subscription';
import {ExpenseService} from '../../service/expense.service';
import {Expense} from '../../model/expense';
import {Observable} from 'rxjs/Observable';
import {CompensationService} from '../../service/compensation.service';
import {Compensation} from '../../model/compensation';
import {Transaction} from '../../model/transaction';

@Component({
  selector: 'tylr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public group: Group;
  public transactions: Transaction[] = [];

  constructor(private route: ActivatedRoute,
              private navigationService: NavigationService,
              private expenseService: ExpenseService,
              private compensationService: CompensationService) {
  }

  ngOnInit() {
    // initialize components (probably a loading icon)
    this.group = this.route.snapshot.data['group'];
    if (!this.group) {
      this.navigationService.goHome();
      return;
    }

    Observable.zip(
      this.expenseService.getExpenses(this.group.id),
      this.compensationService.getCompensations(this.group.id),
      (expenses: Expense[], compensations: Compensation[]) => {
        const transactions: Transaction[] = [];
        expenses.forEach((expense: Expense) => {
          transactions.push(expense);
        });
        compensations.forEach((compensation: Compensation) => {
          transactions.push(compensation);
        });

        transactions.sort((t1: Transaction, t2: Transaction) => {
          return t2.modifiedTime.getTime() - t1.modifiedTime.getTime();
        });
        return transactions;
      }
    ).subscribe(
      (transactions: Transaction[]) => {
        this.transactions = transactions;
      });
  }

  getTransactionEditLink(transaction: Transaction) {
    const endpoint = (transaction instanceof Expense) ? 'expenses' : 'compensations';
    return `${endpoint}/${transaction.id}/edit`;
  }
}
