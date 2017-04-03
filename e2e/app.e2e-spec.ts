import { TylrWebPage } from './app.po';

describe('tylr-web App', () => {
  let page: TylrWebPage;

  beforeEach(() => {
    page = new TylrWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Angular4 works!');
  });
});
