import {
  reducer,
  addItem,
  removeItem,
  changeItemPosition
} from './ingredients-constructor-slice';

describe('ingredientsConstructorSlice', () => {
  const ingredient = {
    _id: '531',
    name: 'Ингредиент',
    type: 'main',
    proteins: 8,
    fat: 2,
    carbohydrates: 3,
    calories: 44,
    price: 990,
    image: 'https://test.test/',
    image_large: 'https://test.test/',
    image_mobile: 'https://test.test/'
  };

  const bun = {
    _id: '213',
    name: 'Булочка',
    type: 'bun',
    proteins: 1,
    fat: 5,
    carbohydrates: 12,
    calories: 120,
    price: 1290,
    image: 'https://test.test/',
    image_large: 'https://test.test/',
    image_mobile: 'https://test.test/'
  };

  const initialState = { bun: null, ingredients: [] };

  describe('Добавление ингредиентов', () => {
    test('Добавление ингредиента', () => {
      const withIngredient = reducer(initialState, addItem(ingredient));

      expect(typeof withIngredient.ingredients[0].id).toBe('string');
      expect(withIngredient).toEqual({
        bun: null,
        ingredients: [expect.objectContaining(ingredient)]
      });
    });

    test('Добавление булки', () => {
      const withBun = reducer(initialState, addItem(bun));

      expect(typeof withBun.bun?.id).toBe('string');
      expect(withBun).toEqual({
        bun: expect.objectContaining(bun),
        ingredients: []
      });
    });
  });

  test('Удаление ингредиента', () => {
    const withRemovedIngredient = reducer(
      { ...initialState, ingredients: [{ ...ingredient, id: '1' }] },
      removeItem({ id: '1' })
    );

    expect(withRemovedIngredient).toEqual(initialState);
  });

  describe('Смена позиции ингредиента', () => {
    const state = {
      ...initialState,
      ingredients: [
        { ...ingredient, id: '1' },
        { ...ingredient, id: '2' },
        { ...ingredient, id: '3' }
      ]
    };

    test('Перемещение наверх', () => {
      const withMovedUp = reducer(
        state,
        changeItemPosition({ id: '3', options: { step: 2, dir: 'back' } })
      );

      expect(withMovedUp.ingredients[0].id).toBe('3');
    });

    test('Перемещение вниз', () => {
      const withMovedDown = reducer(
        state,
        changeItemPosition({ id: '1', options: { step: 2, dir: 'forward' } })
      );

      expect(
        withMovedDown.ingredients[withMovedDown.ingredients.length - 1].id
      ).toBe('1');
    });
  });
});
