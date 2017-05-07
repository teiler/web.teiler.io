/**
 * Created by Keerthikan on 29-Apr-17.
 */
export class GroupTestData {
  private static readonly groupDto = {
    id: '4h43pgmi',
    name: 'Alpha',
    currency: 'chf',
    'update-time': '2017-04-06T20:00:41.504Z',
    'create-time': '2017-04-06T20:00:41.504Z',
    people: [
      {
        id: 4,
        name: 'Person C',
        groupId: '4h43pgmi',
        'update-time': '2017-04-06T20:00:41.504Z',
        'create-time': '2017-04-06T20:00:41.504Z'
      },
      {
        id: 5,
        name: 'Person D',
        groupId: '4h43pgmi',
        'update-time': '2017-04-06T20:00:41.504Z',
        'create-time': '2017-04-06T20:00:41.504Z'
      }
    ]
  };

  private static readonly hsrCrewDto = {
    id: '3hj593m',
    name: 'HSR-Crew',
    currency: 'chf',
    'update-time': '2017-04-06T20:00:41.504Z',
    'create-time': '2017-04-06T20:00:41.504Z',
    people: [
      {
        id: 1,
        name: 'Lukas',
        groupId: '4h43pgmi',
        'update-time': '2017-04-06T20:00:41.504Z',
        'create-time': '2017-04-06T20:00:41.504Z'
      },
      {
        id: 2,
        name: 'Patrick',
        groupId: '4h43pgmi',
        'update-time': '2017-04-06T20:00:41.504Z',
        'create-time': '2017-04-06T20:00:41.504Z'
      },
      {
        id: 3,
        name: 'Kirthi',
        groupId: '4h43pgmi',
        'update-time': '2017-04-06T20:00:41.504Z',
        'create-time': '2017-04-06T20:00:41.504Z'
      },
      {
        id: 4,
        name: 'Demian',
        groupId: '4h43pgmi',
        'update-time': '2017-04-06T20:00:41.504Z',
        'create-time': '2017-04-06T20:00:41.504Z'
      }
    ]
  };

  public static get group() {
    return JSON.parse(JSON.stringify(this.groupDto));
  }

  public static get hsrCrew() {
    return JSON.parse(JSON.stringify(this.hsrCrewDto));
  }
}
