export const TylrApiError = {
  NOT_AUTHORIZED_TO_GROUP: 'Access denied to the group', // 401
  PERSON_NOT_FOUND: 'Person is not found', // 404
  PAYER_NOT_FOUND: 'Payer is not found', // 404
  PROFITEER_NOT_FOUND: 'Profiteer is not found', // 404
  TRANSACTION_NOT_FOUND: 'Transaction is not found', // 404
  SHARES_DONT_ADD_UP: 'Oh snap! That doesn\'t add up yet', // 406
  PEOPLE_NAME_CONFLICT: 'Sorry, names in a group cannot be the same', // 409
  PAYER_AND_ROFITEER_CONFLICT: 'Payer and profiteer cannot be the same person', // 409
  PAYER_INACTIVE: 'Payer is not active', // 410
  PROFITEER_INACTIVE: 'Profiteer is not active', // 410
  CURRENCY_NOT_VALID: 'Unsupported currency', // 416
  PERSON_HAS_UNSETTLED_DEBTS: 'Person has unsettled debts and cannot be deleted', // 417
  GENERAL_SERVER_ERROR: 'Oops. Something went wrong, try to reload the page and try again. ' +
  'If it still doesn\'t work, contact us' // 500
};
