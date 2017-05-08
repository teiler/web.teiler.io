/**
 * Created by Keerthikan on 29-Apr-17.
 */
export class ExpenseTestData {
  private static readonly hsrCrewExpenseDto = {
    'title': 'expense',
    'profiteers': [
      {
        'person': {
          'id': 9,
          'name': 'Demian',
          'active': true,
          'update-time': '2017-05-05T10:09:12.742Z',
          'create-time': '2017-05-05T10:09:12.742Z'
        },
        'share': 0,
        'update-time': '2017-05-06T13:14:57.109Z',
        'create-time': '2017-05-05T22:45:00.897Z'
      },
      {
        'person': {
          'id': 10,
          'name': 'Patrick',
          'active': true,
          'update-time': '2017-05-05T10:09:12.762Z',
          'create-time': '2017-05-05T10:09:12.762Z'
        },
        'share': 0,
        'update-time': '2017-05-06T13:14:57.131Z',
        'create-time': '2017-05-06T13:14:57.131Z'
      },
      {
        'person': {
          'id': 11,
          'name': 'Lukas',
          'active': true,
          'update-time': '2017-05-05T10:09:12.877Z',
          'create-time': '2017-05-05T10:09:12.877Z'
        },
        'share': 0,
        'update-time': '2017-05-06T13:14:57.123Z',
        'create-time': '2017-05-05T22:45:00.905Z'
      },
      {
        'person': {
          'id': 12,
          'name': 'Keerthikan',
          'active': true,
          'update-time': '2017-05-05T10:09:12.877Z',
          'create-time': '2017-05-05T10:09:12.877Z'
        },
        'share': 0,
        'update-time': '2017-05-06T13:14:57.123Z',
        'create-time': '2017-05-05T22:45:00.905Z'
      }
    ],
    'id': 4,
    'amount': 0,
    'payer': {
      'id': 9,
      'name': 'Demian',
      'active': true,
      'update-time': '2017-05-05T10:09:12.877Z',
      'create-time': '2017-05-05T10:09:12.877Z'
    },
    'update-time': '2017-05-06T13:48:59.083Z',
    'create-time': '2017-05-06T13:48:59.083Z'
  };

  public static get hsrCrewExpense() {
    return JSON.parse(JSON.stringify(this.hsrCrewExpenseDto));
  }
}
