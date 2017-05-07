/**
 * Created by Keerthikan on 07-May-17.
 */
import {TylrWebError} from '../model/tylr-web-error';

export abstract class ValidationUtil {
  public static validateGroupId(groupId: string) {
    if (!groupId) {
      throw new Error(TylrWebError.EMPTY_GROUP_ID);
    }
  }

  public static validateExpenseId(expenseId: number) {
    if (!expenseId) {
      throw new Error(TylrWebError.EMPTY_EXPENSE_ID);
    }
  }

  public static validateCompensationId(compensationId: number) {
    if (!compensationId) {
      throw new Error(TylrWebError.EMPTY_COMPENSATION_ID);
    }
  }
}
