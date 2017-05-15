import {browser, element, by} from 'protractor';

export class TylrWebPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('tylr-root h1')).getText();
  }

  getCreateGroupInput() {
    return element(by.id('groupName'));
  }
}
