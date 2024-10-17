const DATASET_PREFIX = 'data-cypress';
const DATASET_VALUES = {
  SAUCES_CATEGORY_LIST: 'ingredients-category-sauce',
  BUNS_CATEGORY_LIST: 'ingredients-category-bun',
  MAINS_CATEGORY_LIST: 'ingredients-category-main',
  BURGER_CONSTRUCTOR: 'burger-constructor',
  MODAL_PANEL: 'modal-panel',
  MODAL_CLOSE_BUTTON: 'modal-close-button',
  MODAL_OVERLAY: 'modal-overlay'
} as const;

const DOM_SELECTORS = Object.entries(DATASET_VALUES).reduce(
  (acc, [key, value]) => ({ ...acc, [key]: `[${DATASET_PREFIX}="${value}"]` }),
  {} as {
    [K in keyof typeof DATASET_VALUES]: `[${typeof DATASET_PREFIX}="${(typeof DATASET_VALUES)[K]}"]`;
  }
);

export default DOM_SELECTORS;
