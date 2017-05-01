export const TylrApiError = {
  NOT_AUTHORIZED_TO_GROUP: 'Access denied to the group', // 401
  PERSON_NOT_FOUND: 'Person is not found', // 404
  PAYER_NOT_FOUND: 'Payer is not found', // 404
  PROFITEER_NOT_FOUND: 'Profiteer is not found', // 404
  TRANSACTION_NOT_FOUND: 'Transaction is not found', // 404
  SHARES_DONT_ADD_UP: 'Shared amounts don\'t sum up to the total amount', // 406
  PEOPLE_NAME_CONFLICT: 'A group shouldn\'t have duplicate person names', // 409
  PAYER_AND_ROFITEER_CONFLICT: 'Payer and profiteer cannot be the same person', // 409
  PAYER_INACTIVE: 'Payer is not active', // 410
  PROFITEER_INACTIVE: 'Profiteer is not active', // 410
  CURRENCY_NOT_VALID: 'Unsupported currency' // 416
};
