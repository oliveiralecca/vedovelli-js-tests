/*
 * (2) Introdução aos testes
 *   -> Agrupar casos de teste => describe()
 *     - primeiro parâmetro: descrição do grupo de testes
 *     - segundo parâmetro: método/função onde virão os it() ou test()
 *   -> Diferença entre .toBe() e .toEqual()
 *     - .toBe() checa se o valor recebido é exatamente igual ao esperado
 *     - .toEqual() checa se é semelhante, por exemplo, um objeto com os mesmos valores porém em ordem diferente
 *   -> Cobertura de testes (coverage)
 *     - tamanho da cobertura no projeto como um todo
 *     - yarn test --coverage => é gerado um relatório sobre a cobertura (porcentagem de linhas, branches (blocos de if, for, etc), funções, arquivos, que têm casos de testes correspondentes)
 */

import { queryString, parse } from './queryString';

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Letícia',
      age: 29,
      profession: 'Developer',
    };

    expect(queryString(obj)).toBe('name=Letícia&age=29&profession=Developer');
  });

  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Letícia',
      skills: ['JS', 'TS', 'React'],
    };

    expect(queryString(obj)).toBe('name=Letícia&skills=JS,TS,React');
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Letícia',
      skills: {
        first: 'JS',
        second: 'React',
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert a query string to object', () => {
    const queryString = 'name=Letícia&profession=Developer';

    expect(parse(queryString)).toEqual({
      name: 'Letícia',
      profession: 'Developer',
    });
  });

  it('should convert a query string of a single key-value pair to object', () => {
    const queryString = 'name=Letícia';

    expect(parse(queryString)).toEqual({
      name: 'Letícia',
    });
  });

  it('should convert a query string to an object taking care of comma separated values', () => {
    const queryString = 'name=Letícia&skills=JS,TS,React';

    expect(parse(queryString)).toEqual({
      name: 'Letícia',
      skills: ['JS', 'TS', 'React'],
    });
  });
});
