/**
 * Created by Keerthikan on 29-Apr-17.
 */
export class GroupTestData {
  private static readonly groupDto = {
    'id': '4h43pgmi',
    'name': 'Alpha',
    'currency': 'chf',
    'people': [
      {
        'id': 3,
        'name': 'Person A',
        'update-time': '2017-04-06T20:07:01.128Z',
        'create-time': '2017-04-06T20:07:01.128Z'
      },
      {
        'id': 4,
        'name': 'Person B',
        'update-time': '2017-04-06T20:10:14.232Z',
        'create-time': '2017-04-06T20:10:14.232Z'
      }
    ],
    'update-time': '2017-04-06T20:00:41.504Z',
    'create-time': '2017-04-06T20:00:41.504Z'
  };

  public static get group() {
    return JSON.parse(JSON.stringify(this.groupDto));
  }
}
