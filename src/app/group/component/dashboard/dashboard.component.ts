import {Component, OnDestroy, OnInit} from '@angular/core';
import {Group} from '../../model/group';
import {ActivatedRoute} from '@angular/router';
import {GroupStorageService} from '../../service/group-storage.service';
import {Subscription} from 'rxjs/Subscription';
import {ExpenseService} from '../../service/expense.service';
import {Expense} from '../../model/expense';
import {Observable} from 'rxjs/Observable';
import {CompensationService} from '../../service/compensation.service';
import {Compensation} from '../../model/compensation';
import {Transaction} from '../../model/transaction';
import {Person} from '../../model/person';
import {GroupService} from '../../service/group.service';
import {Debt} from '../../model/debt';
import {LogService} from '../../../core/service/log.service';

@Component({
  selector: 'tylr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public group: Group;
  private groupSubscription: Subscription;
  public transactions: Transaction[] = [];
  public selectedPerson: Person;
  public debts: Debt[] = [];

  constructor(private route: ActivatedRoute,
              private groupStorageService: GroupStorageService,
              private logService: LogService,
              private expenseService: ExpenseService,
              private compensationService: CompensationService,
              private groupService: GroupService) {
  }

  ngOnInit() {
    // initialize components
    this.setGroup(this.route.snapshot.data['group']);

    this.groupSubscription = this.groupStorageService.onCurrentGroupChanged
      .subscribe(
        (currentGroup: Group) => {
          if (currentGroup) {
            this.setGroup(currentGroup);
          }
        }
      );
  }

  private setGroup(group: Group) {
    this.group = group;
    this.loadTransactions();
    this.loadDebts();
  }

  private loadDebts() {
    this.groupService.getDebts(this.group.id)
      .subscribe(
        (debts: Debt[]) => this.debts = debts,
        (error: Error) => this.logService.error(error)
      );
  }

  public getTransactionEditLink(transaction: Transaction) {
    const endpoint = (transaction instanceof Expense) ? 'expenses' : 'compensations';
    return `${endpoint}/${transaction.id}/edit`;
  }

  public deleteTransaction(transaction: Transaction) {
    let deleteObs: Observable<boolean>;
    if (transaction instanceof Expense) {
      deleteObs = this.expenseService.deleteExpense(this.group.id, transaction.id);
    } else if (transaction instanceof Compensation) {
      deleteObs = this.compensationService.deleteCompensation(this.group.id, transaction.id);
    } else {
      console.error('Unsupported Transaction Type');
      return;
    }
    deleteObs.subscribe(
      (isDeleted: boolean) => {
        this.loadTransactions();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  private loadTransactions() {
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

  public onPersonSelected(p: Person) {
    this.selectedPerson = (p === this.selectedPerson) ? null : p;
  }

  ngOnDestroy() {
    if (this.groupSubscription) {
      this.groupSubscription.unsubscribe();
    }
  }
}
