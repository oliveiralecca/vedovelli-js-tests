/*
 *   -> A lib Zustand é uma alternativa ao Redux e à ContextAPI (do próprio React)
 *     - recursos que são necessários quando diversos componentes precisam manipular os mesmos estados e então precisamos de states globais para não ficar passando esses states de prop em prop entre os componentes
 */

import create from 'zustand';

const initialState = {
  open: false,
  products: [],
};

export const useCartStore = create((set) => ({
  state: {
    ...initialState,
  },
  actions: {
    toggle: () => set((store) => ({ state: { open: !store.state.open } })),
    reset: () => set((store) => ({ state: { ...initialState } })),
    add: (product) =>
      set((store) => ({
        state: { open: true, products: [...store.state.products, product] },
      })),
  },
}));
