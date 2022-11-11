/*
 * (3) Introdução aos testes
 *    -> Pelo TDD (Test-driven development), devemos começar as implementações sempre pelos testes
 *      - o próximo passo é ver o teste falhar, ler as falhas e implementar o necessário para que o teste passe
 *    -> Para rodar algum trecho de código antes de cada teste => beforeEach()
 */

import { Cart } from './Cart';

describe('Cart', () => {
  let cart;
  beforeEach(() => {
    cart = new Cart();
  });

  it('should return 0 when getTotal() is executed in newly created instance', () => {
    const cart = new Cart();

    expect(cart.getTotal()).toEqual(0);
  });

  it('should multiply quantity and price and receive the total amount', () => {
    const item = {
      product: {
        title: 'Adidas running shoes - men',
        price: 35388, // 353.88 | R$ 353,88
      },
      quantity: 2, // 70776
    };

    cart.add(item);

    expect(cart.getTotal()).toEqual(70776);
  });
});
