/*
* Introdução aos testes
*   -> Agrupar casos de teste => describe()
*     - primeiro parâmetro: descrição do grupo de testes
*     - segundo parâmetro: método/função onde virão os it() ou test()
*   -> Diferença entre .toBe() e .toEqual()
*     - .toBe() checa se o valor recebido é exatamente igual ao esperado
*     - .toEqual() checa se é semelhante, por exemplo, um objeto com os mesmos valores porém em ordem diferente
*/

const { queryString } = require('./queryString');

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Letícia',
      age: 29,
      profession: 'Developer'
    };

    expect(queryString(obj)).toBe(
      'name=Letícia&age=29&profession=Developer'
    );
  });
});

// describe('Query string to object', () => {
  
// });
