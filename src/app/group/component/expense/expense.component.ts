import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CrudOperation} from '../../../shared/model/crud-operation';
import {Group} from '../../model/group';
import {ExpenseService} from '../../service/expense.service';
import {Expense} from '../../model/expense';
import {Person} from '../../model/person';
import {Profiteer} from '../../model/profiteer';

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
              private expenseService: ExpenseService) {
    this.MODE = this.route.snapshot.paramMap.has('expenseId') ?
      CrudOperation.EDIT : CrudOperation.CREATE;
  }

  ngOnInit() {
    this.group = this.route.snapshot.data['group'];
    switch (this.MODE) {
      case CrudOperation.CREATE: {
        const expense = new Expense(null, this.group.people[0], 0, '', []);
        this.fillProfiteers(expense, this.group.getPeopleAsMap(), CrudOperation.CREATE);
        this.expense = expense;
        break;
      }
      case CrudOperation.EDIT: {
        const expenseId = this.route.snapshot.paramMap.get('expenseId');
        this.expenseService.getExpense(this.group.id, parseInt(expenseId, 10))
          .subscribe(
            (expense: Expense) => {
              console.log(expense);
              this.fillProfiteers(expense, this.group.getPeopleAsMap(), CrudOperation.EDIT);
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

  private fillProfiteers(expenseToUpdate: Expense, people: Map<number, Person>, mode: CrudOperation) {
    expenseToUpdate.profiteers.forEach((profiteer: Profiteer) => {
      people.delete(profiteer.person.id);
    });

    people.forEach((person: Person) => {
      expenseToUpdate.profiteers.push(
        new Profiteer(person, 0, mode === CrudOperation.CREATE)
      );
    });
  }

}
