/**
 * Created by Keerthikan on 07-May-17.
 */

export let personSpyFactory = (jasmine) => {
  const personSpy = jasmine.createSpyObj('personGroupService',
    ['createPerson', 'updatePerson', 'deletePerson']);

  return personSpy;
};
