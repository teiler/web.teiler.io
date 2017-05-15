import {TylrWebPage} from './app.po';
import {browser, element, by} from 'protractor';

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

  it('should create a group', () => {
    page.navigateTo();
    page.getCreateGroupInput().sendKeys('e2e test');
    element(by.css('tylr-group-create button')).click();
    browser.getCurrentUrl().then(url => console.log);
  });
});
