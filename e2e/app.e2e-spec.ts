import {TylrWebPage} from './app.po';
import {browser, element, by} from 'protractor';
import request = require('request-promise');

describe('tylr-web App', () => {
  let page: TylrWebPage;
  let groupId: string;

  beforeEach(() => {
    page = new TylrWebPage();
  });

  it('should serve the app and display title saying teiler.io', () => {
    page.open();
    page.getHomeTitle().then((text: string) => {
      expect(text).toEqual('teiler.io');
    });
  });

  it('should create a group', () => {
    page.open();
    page.getCreateGroupInput().sendKeys('e2e test');
    page.getCreateButton().click();
    browser.getCurrentUrl().then(url => {
      expect(url).toContain('groups');
      const splittedUrl = url.split('/');
      groupId = splittedUrl[splittedUrl.length - 1];
      expect(groupId).toBeDefined();
    });
  });

  it('should create people', (done) => {
    page.navigateTo(`/groups/${groupId}/edit`);
    const totalPeople = 4;

    for (let i = 0; i < totalPeople; i++) {
      page.getAddPersonButton().click();
    }

    // type person's name starting from character A
    page.getAllPeopleInput().each((input, index) => {
      input.sendKeys(String.fromCharCode(65 + index));
    });

    page.getGroupSavebutton().click();
    setTimeout(() => {
      browser.getCurrentUrl().then(url => expect(url.endsWith(`groups/${groupId}`)).toBeTruthy());
      page.getAllPersonCards().count()
        .then(value => {
          expect(value).toEqual(totalPeople);
        });
      done();
    }, 5000);
  });

  it('should split expense equally', () => {
    page.navigateTo(`/groups/${groupId}/expenses/create`);
    page.getExpenseAmountInput().sendKeys(20);

    page.getAllShareInput().each((input) => {
      input.getAttribute('value').then(value => {
        expect(value).toEqual('5.00');
      });
    });
  });

  it('should delete a group', (done) => {
    // delete group
    request.delete(`https://api.teiler.io/v1/groups/${groupId}`)
      .then(() => {
        page.navigateTo(`/groups/${groupId}`);

        // browser should be navigated to home page
        browser.getCurrentUrl().then(url => expect(url.indexOf(`groups`)).toEqual(-1));
        done();
      })
      .catch(error => {
        expect(error).toBeUndefined();
        done();
      });
  });
});
