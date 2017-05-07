import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CrudOperation} from '../../../shared/model/crud-operation';
import {NumberUtil} from '../../../shared/util/number-util';
import {Group} from '../../model/group';
import {ExpenseService} from '../../service/expense.service';
import {Expense} from '../../model/expense';
import {Person} from '../../model/person';
import {Profiteer} from '../../model/profiteer';
import {NgForm} from '@angular/forms';
import {NavigationService} from '../../../core/service/navigation.service';


@Component({
  selector: 'tylr-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
  private MODE: CrudOperation;
  public group: Group;
  public expense: Expense;
  public response: string;

  // for ui customized properties
  public totalAmount: string;

  constructor(private route: ActivatedRoute,
              private expenseService: ExpenseService,
              private navigationService: NavigationService) {
    this.MODE = this.route.snapshot.paramMap.has('expenseId') ?
      CrudOperation.EDIT : CrudOperation.CREATE;
  }

  ngOnInit() {
    this.group = this.route.snapshot.data['group'];
    switch (this.MODE) {
      case CrudOperation.CREATE: {
        this.handleCreateMode();
        break;
      }
      case CrudOperation.EDIT: {
        this.handleEditMode();
        break;
      }
      default: {
        throw new Error('Unsupported operation');
      }
    }
  }

  private handleCreateMode() {
    if (this.group.people.length < 2) {
      this.navigationService.goToDashboard(this.group.id);
    }

    const selectedPayerId: number = parseInt(this.route.snapshot.queryParamMap.get('payerId'), 10);
    let selectedPayer: Person = this.group.getPeopleAsMap().get(selectedPayerId);
    if (!selectedPayer) {
      selectedPayer = this.group.people[0];
    }

    const expense = new Expense(null, selectedPayer, 0, '', []);
    this.setExpense(expense);
  }

  private handleEditMode() {
    const expenseId = this.route.snapshot.paramMap.get('expenseId');
    this.expenseService.getExpense(this.group.id, parseInt(expenseId, 10))
      .subscribe(
        (expense: Expense) => {
          this.setExpense(expense);
        }
      );
  }

  private setExpense(expense: Expense) {
    expense.fillProfiteers(this.group.getPeopleAsMap(), this.MODE === CrudOperation.CREATE ? true : false);
    this.expense = expense;
    this.updateTotalAmount(expense.amountDecimal);
  }

  public onTotalAmountChanged(value: string) {
    this.expense.amount = NumberUtil.convertStringToNumber(value) * 100;
    this.expense.splitEvenly();
  }

  public onSharedAmountChanged(value: string, profiteer: Profiteer) {
    const sharedValue = NumberUtil.convertStringToNumber(value);
    this.expense.updateProfiteer(profiteer, sharedValue * 100, true);
    this.expense.splitEvenlyAmongRestProfiteers();
  }

  public onPayerChanged(payerId: string) {
    this.expense.payer = this.group.getPeopleAsMap().get(parseInt(payerId, 10));
  }

  public toggleIsInvolved(event: Event, p: Profiteer) {
    event.stopPropagation();
    p.isInvolved = !p.isInvolved;
    this.expense.splitEvenly();
  }

  public saveExpense(expenseForm: NgForm): boolean {
    if (expenseForm.form.valid) {
      this.expenseService.saveExpense(this.group.id, this.expense, this.MODE)
        .subscribe(
          () => {
            this.navigationService.goToDashboard(this.group.id);
          },
          (error: Error) => {
            this.response = error.message;
          }
        );
    }
    return false;
  }

  public updateTotalAmount(value: number) {
    this.totalAmount = value.toFixed(2);
  }
}
