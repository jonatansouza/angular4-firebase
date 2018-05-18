import { ModeloAppPage } from './app.po';

describe('modelo-app App', () => {
  let page: ModeloAppPage;

  beforeEach(() => {
    page = new ModeloAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
