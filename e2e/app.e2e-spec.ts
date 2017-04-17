import { TylrWebPage } from './app.po';

describe('tylr-web App', () => {
  let page: TylrWebPage;

  beforeEach(() => {
    page = new TylrWebPage();
  });

  it('should display title saying teiler.io', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('teiler.io');
  });
});
