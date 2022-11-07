/*
* Introdução aos testes
*   -> Métodos para escrever um teste => it() ou test()
*     - primeiro parâmetro: descrição do teste
*     - segundo parâmetro: método/função onde o teste será implementado e executado
*   -> Dentro dos testes fazemos "assertions" (afirmações)
*     - determinar se um método da aplicação retorna o que estou esperando que retorne
*     - expect()
*   -> Verificando se o teste que passou não é um falso-positivo
*     - uma das estratégias é usar a negação => expect().not.toBe()
*     - caso o teste não passe, ele está correto e não é um falso-positivo
*/

const { sum } = require('./calculator');

it('should sum 2 and 2 and the result must be 4', () => {
  expect(sum(2, 2)).not.toBe(4);
});
