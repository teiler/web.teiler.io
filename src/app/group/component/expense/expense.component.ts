import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CrudOperation} from '../../model/crud-operation';
import {Group} from '../../model/group';

@Component({
  selector: 'tylr-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
  private MODE: CrudOperation;
  public group: Group;

  constructor(private route: ActivatedRoute) {
    this.MODE = this.route.snapshot.paramMap.has('expenseId') ?
      CrudOperation.EDIT : CrudOperation.CREATE;
  }

  ngOnInit() {
    this.group = this.route.snapshot.data['group'];
  }

  test() {
    console.log('changed');
  }

}
