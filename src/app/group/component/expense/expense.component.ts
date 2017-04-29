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
        const expense = new Expense(null, this.group.people[0], 0, '', []);
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

  public onTotalAmountChanged() {
    const totalActive = this.expense.getTotalActiveProfiteers();
    const share = this.expense.amount / totalActive;
    this.expense.profiteers.forEach((profiteer: Profiteer) => {
      if (profiteer.isInvolved) {
        profiteer.share = share;
      }
    });
  }

  public onPayerChanged(payerId: string) {
    this.expense.payer = this.group.getPeopleAsMap().get(parseInt(payerId, 10));
  }

  public toggleIsInvolved(event: Event, p: Profiteer) {
    event.stopPropagation();
    p.isInvolved = !p.isInvolved;

    this.onTotalAmountChanged();
  }

  public saveExpense(expenseForm: NgForm): boolean {
    if (expenseForm.form.valid) {
      this.expenseService.saveExpense(this.group.id, this.expense, this.MODE)
        .subscribe(
          (expense: Expense) => {
            this.navigationService.goToDashboard(this.group.id);
          },
          (error: Error) => {
            console.error(error);
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
  }

}
