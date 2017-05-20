import {TylrWebPage} from './app.po';
import {browser, element, by} from 'protractor';
import * as request from 'request';

describe('tylr-web App', () => {
  let page: TylrWebPage;
  let groupId: string;

  beforeEach(() => {
    page = new TylrWebPage();
  });

  it('should serve the app and display title saying teiler.io', () => {
    page.navigateTo();
    page.getParagraphText().then((text: string) => {
      expect(text).toEqual('teiler.io');
    });
  });

  it('should create a group', () => {
    page.navigateTo();
    page.getCreateGroupInput().sendKeys('e2e test');
    page.getCreateButton().click();
    browser.getCurrentUrl().then(url => {
      expect(url).toContain('groups');
      const splittedUrl = url.split('/');
      groupId = splittedUrl[splittedUrl.length - 1];
      expect(groupId).toBeDefined();

      console.log(groupId);
      request.delete(`https://web.teiler.io/groups/${groupId}`, (error, response, body) => {
        expect(error).toBeUndefined();
        console.log(response);
      });
    });
  });
});
