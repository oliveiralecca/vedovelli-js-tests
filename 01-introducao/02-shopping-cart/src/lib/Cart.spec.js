/*
 * (3) Introdução aos testes
 *    -> Pelo TDD (Test-driven development), devemos começar as implementações sempre pelos testes
 *      - o próximo passo é ver o teste falhar, ler as falhas e implementar o necessário para que o teste passe
 *    -> Para rodar algum trecho de código antes de cada teste => beforeEach()
 *    -> Para rodar apenas um caso de teste e pular os demais, escreve-se => fit() ao invés de it()
 *    -> Um describe() pode vir dentro de outro a fim de organizar os testes em blocos
 *    -> Quando o retorno de uma função é um objeto grande, por exemplo, para que não seja preciso digitar todo o retorno esperado no .toEqual(), existe um método próprio do jest que faz isso para nós => .toMatchInlineSnapshot()
 *    -> Para obter a mesma funcionalidade acima, porém, sem "sujar" o arquivo de teste com um retorno grande, existe um outro tipo de snapshot que cria um arquivo só para isso => .toMatchSnapshot()
 */

import { Cart } from './Cart';

describe('Cart', () => {
  let cart;
  let productA = {
    title: 'Adidas running shoes - men',
    price: 35388, // 353.88 | R$ 353,88
  };
  let productB = {
    title: 'Adidas running shoes - women',
    price: 41872, // 418.72 | R$ 418,72
  };

  beforeEach(() => {
    cart = new Cart();
  });

  describe('getTotal()', () => {
    it('should return 0 when getTotal() is executed in newly created instance', () => {
      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it('should multiply quantity and price and receive the total amount', () => {
      const item = {
        product: productA,
        quantity: 2, // 70776
      };

      cart.add(item);

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('should ensure no more than on product exists at a time', () => {
      cart.add({
        product: productA,
        quantity: 2,
      });

      cart.add({
        product: productA,
        quantity: 1,
      });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });

    it('should update total when a product gets included and then removed', () => {
      cart.add({
        product: productA,
        quantity: 2,
      });

      cart.add({
        product: productB,
        quantity: 1,
      });

      cart.remove(productA);

      expect(cart.getTotal().getAmount()).toEqual(41872);
    });
  });

  describe('checkout()', () => {
    it('should return an object with the total and the list of items', () => {
      cart.add({
        product: productA,
        quantity: 2,
      });

      cart.add({
        product: productB,
        quantity: 3,
      });

      expect(cart.checkout()).toMatchSnapshot();
    });

    it('should return an object with the total and the list of items when summary() is called', () => {
      cart.add({
        product: productA,
        quantity: 5,
      });

      cart.add({
        product: productB,
        quantity: 3,
      });

      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
    });

    it('should reset the cart when checkout() is called', () => {
      cart.add({
        product: productB,
        quantity: 3,
      });

      cart.checkout();

      expect(cart.getTotal().getAmount()).toEqual(0);
    });
  });
});
