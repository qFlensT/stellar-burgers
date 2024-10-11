import { rootReducer } from './root-reducer';

describe('rootReducer', () => {
  test('В объекте, который возвращается корневым редьюсером, должны быть поля с другими редьюсерами', () => {
    const keys = Object.keys(rootReducer(undefined, { type: '@@INIT' }));

    expect(keys).toEqual([
      'user',
      'ingredients',
      'feeds',
      'orders',
      'createOrder',
      'ingredientsConstructor'
    ]);
  });
});
