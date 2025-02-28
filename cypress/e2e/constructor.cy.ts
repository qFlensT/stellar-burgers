import API_ENDPOINTS from 'cypress/constants/api-endpoints';
import DOM_SELECTORS from 'cypress/constants/dom-selectors';

const addIngredientAndCheckConstructor = (selector: string) => {
  cy.get(selector).within(() => {
    cy.get('a')
      .children()
      .last()
      .should('match', 'p')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.not.be.empty;
        cy.get('@constructor').should('not.contain.text', text);

        cy.get(selector).find('button').click();
        cy.get('@constructor').should('contain.text', text);
      });
  });
};

describe('E2E тестирование конструктора', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);

    cy.intercept('GET', API_ENDPOINTS.GET_INGREDIENTS, {
      fixture: 'ingredients.json'
    });

    cy.visit('/');
  });

  it('Конструирование бургера', () => {
    cy.get(DOM_SELECTORS.BURGER_CONSTRUCTOR).as('constructor');

    cy.get(DOM_SELECTORS.BUNS_CATEGORY_LIST).find('li').first().as('bun');
    cy.get(DOM_SELECTORS.MAINS_CATEGORY_LIST).find('li').first().as('main');
    cy.get(DOM_SELECTORS.SAUCES_CATEGORY_LIST).find('li').first().as('sauce');

    cy.get('@constructor')
      .should('contain.text', 'Выберите булки')
      .should('contain.text', 'Выберите начинку')
      .children()
      .last()
      .find('p')
      .should('have.text', '0');

    addIngredientAndCheckConstructor('@bun');
    addIngredientAndCheckConstructor('@main');
    addIngredientAndCheckConstructor('@sauce');
  });

  it('Модальные окна ингредиентов', () => {
    cy.get(DOM_SELECTORS.BUNS_CATEGORY_LIST).find('li').first().as('bun');

    for (let i = 0; i < 2; i++) {
      cy.get('@bun')
        .click()
        .find('a')
        .children()
        .last()
        .should('match', 'p')
        .invoke('text')
        .then((text) => {
          cy.get(DOM_SELECTORS.MODAL_PANEL)
            .find('h3')
            .last()
            .should('have.text', text);
        });

      if (!i) cy.get(DOM_SELECTORS.MODAL_CLOSE_BUTTON).click();
      else cy.get(DOM_SELECTORS.MODAL_OVERLAY).click({ force: true });

      cy.get(DOM_SELECTORS.MODAL_PANEL).should('not.exist');
    }

    cy.get('@bun').click();
    cy.reload();
    cy.get(DOM_SELECTORS.MODAL_PANEL).should('be.visible');
  });
});
