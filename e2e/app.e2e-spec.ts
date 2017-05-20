import {TylrWebPage} from './app.po';
import {browser, element, by} from 'protractor';
import request = require('request-promise');

describe('tylr-web App', () => {
  let page: TylrWebPage;

  beforeEach(() => {
    page = new TylrWebPage();
  });

  it('should serve the app and display title saying teiler.io', () => {
    page.navigateTo();
    page.getParagraphText().then((text: string) => {
      expect(text).toEqual('teiler.io');
    });
  });

  it('should create a group', (done) => {
    page.navigateTo();
    page.getCreateGroupInput().sendKeys('e2e test');
    page.getCreateButton().click();
    browser.getCurrentUrl().then(url => {
      expect(url).toContain('groups');
      const splittedUrl = url.split('/');
      const groupId = splittedUrl[splittedUrl.length - 1];
      expect(groupId).toBeDefined();

      // delete group
      request.delete(`https://api.teiler.io/v1/groups/${groupId}`)
        .then(() => {
          done();
        })
        .catch(error => {
          expect(error).toBeUndefined();
          done();
        });
    });
  });
});
