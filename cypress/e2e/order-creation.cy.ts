import API_ENDPOINTS from 'cypress/constants/api-endpoints';
import DOM_SELECTORS from 'cypress/constants/dom-selectors';

describe('E2E тестирование создания заказа', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);

    cy.intercept('GET', API_ENDPOINTS.GET_INGREDIENTS, {
      fixture: 'ingredients.json'
    });

    cy.intercept('GET', API_ENDPOINTS.GET_USER, {
      fixture: 'user.json'
    });

    cy.intercept('POST', API_ENDPOINTS.POST_CREATE_ORDER, {
      fixture: 'created-order.json'
    });

    cy.setCookie(
      'accessToken',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGFlZTUwMTE5ZDQ1MDAxYjUwNDliNiIsImlhdCI6MTcyODk4Nzg3OSwiZXhwIjoxNzI4OTg5MDc5fQ.Ej6BBTVzGHSw1Z_lmzIQLZrY0TCriGSATVcLk3u90JM'
    );

    cy.visit('/', {
      onBeforeLoad: (win) =>
        win.localStorage.setItem(
          'refreshToken',
          '7ff0fc4844a88b6f023960d9ba444f01a9576d24850bcba59a1954ba9b1eb47c02ce63b626de6925'
        )
    });
  });

  it('Создание бургера и проверка заказа', () => {
    cy.get(DOM_SELECTORS.BUNS_CATEGORY_LIST).find('li').first().as('bun');
    cy.get(DOM_SELECTORS.MAINS_CATEGORY_LIST).find('li').first().as('main');

    cy.get('@bun').find('button').click();
    cy.get('@main').find('button').click();

    cy.get(DOM_SELECTORS.BURGER_CONSTRUCTOR)
      .children()
      .last()
      .find('button')
      .click();

    cy.fixture('created-order.json').then((obj) => {
      cy.get(DOM_SELECTORS.MODAL_PANEL)
        .find('h2')
        .should('have.text', obj.order.number);
    });

    cy.get(DOM_SELECTORS.MODAL_CLOSE_BUTTON).click();

    cy.get(DOM_SELECTORS.MODAL_PANEL).should('not.exist');

    cy.get(DOM_SELECTORS.BURGER_CONSTRUCTOR)
      .should('contain.text', 'Выберите булки')
      .should('contain.text', 'Выберите начинку')
      .children()
      .last()
      .find('p')
      .should('have.text', '0');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});
