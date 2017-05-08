import { TylrWebPage } from './app.po';

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
    page.getParagraphText().then((text: string) => {
      expect(text).toEqual('teiler.io');
    });
  });
});
