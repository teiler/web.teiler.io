import {Injectable} from "@angular/core";
import {ExpenseResourceService} from "../resource/expense-resource.service";
import {Observable} from "rxjs/Observable";
import {Expense} from "../model/expense";
import {CrudOperation} from "../../shared/model/crud-operation";
import {TylrWebError} from "../../shared/model/tylr-web-error";
import {ValidationUtil} from "../../shared/util/validation-util";

@Injectable()
export class ExpenseService {

  constructor(private expenseResource: ExpenseResourceService) {
  }

  public getExpenses(groupId: string): Observable<Expense[]> {
    try {
      ValidationUtil.validateGroupId(groupId);
    } catch (error) {
      return Observable.throw(error);
    }

    return this.expenseResource.getExpenses(groupId)
      .map((dto: any) => {
        const expenses: Expense[] = [];
        dto.forEach((expense: any) => {
          expenses.push(Expense.fromDto(expense));
        });
        return expenses;
      }).catch((error: Error) => {
        return Observable.throw(error);
      });
  }

  public getExpense(groupId: string, expenseId: number): Observable<Expense> {
    try {
      ValidationUtil.validateGroupId(groupId);
      ValidationUtil.validateExpenseId(expenseId);
    } catch (error) {
      return Observable.throw(error);
    }

    return this.expenseResource.getExpense(groupId, expenseId)
      .map((dto: any) => {
        return Expense.fromDto(dto);
      }).catch((error: Error) => {
        return Observable.throw(error);
      });
  }

  public saveExpense(groupId: string, expense: Expense, mode: CrudOperation): Observable<Expense> {
    try {
      ValidationUtil.validateGroupId(groupId);

      if (mode === CrudOperation.EDIT) {
        ValidationUtil.validateExpenseId(expense.id);
      }
    } catch (error) {
      return Observable.throw(error);
    }

    let saveObs: Observable<any>;
    if (mode === CrudOperation.CREATE) {
      saveObs = this.expenseResource.createExpense(groupId, expense);
    } else if (mode === CrudOperation.EDIT) {
      saveObs = this.expenseResource.updateExpense(groupId, expense);
    } else {
      return Observable.throw(new Error(TylrWebError.UNSUPPORTED_OPERATION));
    }

    return saveObs.map((dto: any) => {
      return Expense.fromDto(dto);
    }).catch((error: Error) => {
      return Observable.throw(error);
    });
  }

  public deleteExpense(groupId: string, expenseId: number): Observable<boolean> {
    try {
      ValidationUtil.validateGroupId(groupId);
      ValidationUtil.validateExpenseId(expenseId);
    } catch (error) {
      return Observable.throw(error);
    }

    return this.expenseResource.deleteExpense(groupId, expenseId);
  }
}
