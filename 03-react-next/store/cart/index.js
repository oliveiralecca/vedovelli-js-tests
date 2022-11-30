/*
 *   -> A lib Zustand é uma alternativa ao Redux e à ContextAPI (do próprio React)
 *     - recursos que são necessários quando diversos componentes precisam manipular os mesmos estados e então precisamos de states globais para não ficar passando esses states de prop em prop entre os componentes
 */

import create from 'zustand';

export const useCartStore = create((set) => ({
  state: {
    open: false,
    products: [],
  },
  actions: {
    toggle: () => set((store) => ({ state: { open: !store.state.open } })),
    add: (product) =>
      set((store) => ({
        state: { ...store.state, products: [...store.state.products, product] },
      })),
  },
}));
