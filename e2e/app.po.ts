import {browser, element, by} from 'protractor';

export class TylrWebPage {
  open() {
    return browser.get('/');
  }

  navigateTo(path: string) {
    return browser.get(path);
  }

  /* Home page
   --------------*/

  getHomeTitle() {
    return element(by.css('tylr-root h1')).getText();
  }

  getCreateGroupInput() {
    return element(by.id('groupName'));
  }

  getCreateButton() {
    return element(by.css('tylr-group-create button'));
  }

  /* Group Edit
   --------------*/
  getAddPersonButton() {
    return element(by.className('add'));
  }

  getAllPeopleInput() {
    return element.all(by.css('form fieldset input'));
  }

  getGroupSavebutton() {
    return element(by.css('form button[type="submit"'));
  }

  /* Dashboard
   --------------*/
  getAllPersonCards() {
    return element.all(by.css('div.card.person'));
  }

  /* Expense
   --------------*/
  getExpenseAmountInput() {
    return element(by.css('input[name="amount"'));
  }

  getAllShareInput() {
    return element.all(by.css('input.shared-amount'));
  }
}
