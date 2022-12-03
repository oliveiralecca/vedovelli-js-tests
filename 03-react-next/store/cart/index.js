/*
 *   -> A lib Zustand é uma alternativa ao Redux e à ContextAPI (do próprio React)
 *     - recursos que são necessários quando diversos componentes precisam manipular os mesmos estados e então precisamos de states globais para não ficar passando esses states de prop em prop entre os componentes
 */

import create from 'zustand';
import produce from 'immer';

const initialState = {
  open: false,
  products: [],
};

export const useCartStore = create((set) => {
  const setState = (fn) => set(produce(fn));

  return {
    state: {
      ...initialState,
    },
    actions: {
      toggle() {
        setState(({ state }) => {
          state.open = !state.open;
        });
      },
      reset() {
        setState((store) => {
          store.state = initialState;
        });
      },
      add(product) {
        setState(({ state }) => {
          if (!state.products.includes(product)) {
            state.products.push(product);
          }
        });
      },
    },
  };
});
