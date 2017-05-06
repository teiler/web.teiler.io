import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CrudOperation} from '../../../shared/model/crud-operation';
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
        if (this.group.people.length < 2) {
          this.navigationService.goToDashboard(this.group.id);
        }

        const selectedPayerId: number = parseInt(this.route.snapshot.queryParamMap.get('payerId'), 10);
        let selectedPayer: Person = this.group.getPeopleAsMap().get(selectedPayerId);
        if (!selectedPayer) {
          selectedPayer = this.group.people[0];
        }

        const expense = new Expense(null, selectedPayer, 0, '', []);
        this.fillProfiteers(expense, this.group.getPeopleAsMap(), true);
        this.expense = expense;

        break;
      }
      case CrudOperation.EDIT: {
        const expenseId = this.route.snapshot.paramMap.get('expenseId');
        this.expenseService.getExpense(this.group.id, parseInt(expenseId, 10))
          .subscribe(
            (expense: Expense) => {
              this.fillProfiteers(expense, this.group.getPeopleAsMap(), false);
              this.expense = expense;
            }
          );
        break;
      }
      default: {
        throw new Error('Unsupported operation');
      }
    }
  }

  public onTotalAmountChanged(value: string) {
    this.expense.amountDecimal = this.convertStringToNumber(value);
    this.expense.split();
  }

  public onSharedAmountChanged(value: string, profiteer: Profiteer) {
    const sharedValue = this.convertStringToNumber(value);
    profiteer.updateShare(sharedValue * 100);
  }

  public onPayerChanged(payerId: string) {
    this.expense.payer = this.group.getPeopleAsMap().get(parseInt(payerId, 10));
  }

  public toggleIsInvolved(event: Event, p: Profiteer) {
    event.stopPropagation();
    p.isInvolved = !p.isInvolved;

    if (!p.isInvolved) {
      p.updateShare(0);
      p.setPercentageFormatted(0);
    }
    this.expense.split();
  }

  public saveExpense(expenseForm: NgForm): boolean {
    if (expenseForm.form.valid) {
      this.expenseService.saveExpense(this.group.id, this.expense, this.MODE)
        .subscribe(
          (expense: Expense) => {
            this.navigationService.goToDashboard(this.group.id);
          },
          (error: Error) => {
            this.response = error.message;
          }
        );
    } else {
      console.log(expenseForm.errors);
    }
    return false;
  }

  private fillProfiteers(expenseToUpdate: Expense, people: Map<number, Person>, isInvolved: boolean) {
    expenseToUpdate.profiteers.forEach((profiteer: Profiteer) => {
      people.delete(profiteer.person.id);
    });

    people.forEach((person: Person) => {
      expenseToUpdate.profiteers.push(
        new Profiteer(person, 0, isInvolved)
      );
    });

    expenseToUpdate.updatePercentage();
  }

  private convertStringToNumber(value: string) {
    const parsedNumber = parseFloat(value);
    return isNaN(parsedNumber) ? 0 : parsedNumber;
  }

}
