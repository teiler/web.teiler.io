/**
 * Created by Keerthikan on 07-May-17.
 */
import {TylrWebError} from '../model/tylr-web-error';
import {Group} from '../../group/model/group';
import {TylrApiError} from '../model/tylr-api-error';

export abstract class ValidationUtil {

  public static validateGroup(group: Group) {
    if (!group) {
      throw new Error(TylrWebError.NULL_GROUP);
    }
    ValidationUtil.validateGroupId(group.id);
    ValidationUtil.validateGroupName(group.name);

    if (group.hasDuplicatePerson()) {
      throw new Error(TylrApiError.PEOPLE_NAME_CONFLICT);
    }
  }

  public static validateGroupId(groupId: string) {
    if (!groupId) {
      throw new Error(TylrWebError.EMPTY_GROUP_ID);
    }
  }

  public static validateGroupName(name: string) {
    if (!name || !name.trim()) {
      throw new Error(TylrWebError.EMPTY_GROUP_NAME);
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
