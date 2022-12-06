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
      add(product) {
        setState(({ state }) => {
          const doesntExist = !state.products.find(
            ({ id }) => id === product.id,
          );

          if (doesntExist) {
            state.products.push(product);
            state.open = true;
          }
        });
      },
      remove(product) {
        setState(({ state }) => {
          const exists = !!state.products.find(({ id }) => id === product.id);

          if (exists) {
            state.products = state.products.filter(({ id }) => {
              return id !== product.id;
            });
          }
        });
      },
      removeAll() {
        setState(({ state }) => {
          state.products = [];
        });
      },
      reset() {
        setState((store) => {
          store.state = initialState;
        });
      },
    },
  };
});
