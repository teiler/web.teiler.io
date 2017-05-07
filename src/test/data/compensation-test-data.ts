/**
 * Created by Keerthikan on 29-Apr-17.
 */
export class CompensationTestData {
  private static readonly compensationDto = {
    'profiteer': {
      'id': 11,
      'name': 'Test 3',
      'active': true,
      'update-time': '2017-05-05T10:09:12.877Z',
      'create-time': '2017-05-05T10:09:12.877Z'
    },
    'id': 11,
    'amount': 1000,
    'payer': {
      'id': 9,
      'name': 'Test 1',
      'active': true,
      'update-time': '2017-05-05T10:09:12.742Z',
      'create-time': '2017-05-05T10:09:12.742Z'
    },
    'update-time': '2017-05-07T00:57:07.283Z',
    'create-time': '2017-05-07T00:57:07.283Z'
  };

  public static get compensation() {
    return JSON.parse(JSON.stringify(this.compensationDto));
  }
}
