# Conteúdo teórico

## Por que testar?
- confiança ao refatorar
- confiança ao incluir novas funcionalidades
- confiança ao atualizar dependências (dica: dependabot configurado no GitHub do projeto)
- facilita a compreensão da implementação
- funciona como uma documentação do projeto

## O que testar?
- tudo o que fizer sentido testar
- por exemplo: se o retorno de uma função for removido, ou alterado, ou se for incluída uma propriedade num possível objeto de retorno, isso tem potencial para quebrar alguma outra coisa no sistema? 
  - SIM: então é interessante escrever um teste
  - NÃO: nesse caso o teste pode ser escrito a título de documentação
- devo deixar um comentário para explicar o código?
  - escreva um teste no lugar (explica e prova que funciona) :rocket:

## Tipos de testes
Pirâmide de testes: os tipos mais comuns...
### Unit Tests (Testes Unitários) 
- testar método por método
- a unidade deve ser pequena e fazer uma única coisa
- têm que evitar o máximo de dependências externas
### Integration Tests (Testes de Integração)
- garantem que diversas unidades trabalham bem em conjunto dentro de uma composição
- envolvem componentes mais complexos que normalmente se comunicam com fontes externas de dados
- renderizam outros componentes e são responsáveis por passar métodos e dados aos componentes filhos 
### End to End (E2E) Tests
- testes a nível do que o usuário encontra na nossa aplicação
- normalmente rodam no browser

## Ferramentas e Bibliotecas
Bibliotecas trabalham em conjunto com as ferramentas, e nos permitem fazer além do que a ferramenta por si só permite, como por exemplo, montar os componentes e acessar o seu interior.
### Ferramentas
#### Jest
- é um _test runner_: localiza os arquivos e executa os testes
- permite fazer _mock_ e observar métodos em bibliotecas
- permite fazer _assertions_, tais como `expect().toBe()`
#### Cypress
- framework de testes E2E
- executa a aplicação no browser, como se fosse o usuário
- permite executar no Chrome, Firefox, Edge e Electron
- ferramenta completa, não precisa ser usada com Jest
### Bibliotecas
#### Testing Library
- provê utilitários para montar componentes (React, Vue, Svelte, ...)
- oferece ferramentas para interagir com componentes como se fosse o usuário
- trabalha em conjunto com o Jest
- faz o mesmo papel do Enzyme e Vue Test Utils
- pode ser utilizada para substitui-las ou em conjunto
#### Enzyme
- provê utilitários para montar componentes React
- oferece ferramentas para interagir com componentes como se fosse o usuário
- permite manejar state e testar detalhes de implementação, diferente da Testing Library (torna os testes um pouco mais bagunçados, tem que tomar cuidado!)
- trabalha em conjunto com o Jest
- faz o mesmo papel da Testing Library 
- pode ser utilizada para substitui-la ou em conjunto
#### Vue Test Utils
- provê utilitários para montar componentes Vue.js
- oferece ferramentas para interagir com componentes como se fosse o usuário
- permite manejar state e testar detalhes de implementação
- trabalha em conjunto com o Jest
- faz o mesmo papel da Testing Library 
- pode ser utilizada para substitui-la ou em conjunto

## Integração com CI/CD
### O papel dos testes no deploy moderno.
Os testes são integrados ao processo de Continuous Integration (CI)/Continuous Delivery (CD) - fazer merge na branch principal e já fazer um deploy automático - e são fundamentais para que estes existam.
- Github Actions
- CircleCI

## Test Driven Development (TDD)
Uma forma de desenvolver aplicações, na qual os testes fazem parte. Funciona como um ciclo composto por 3 partes, até que a funcionalidade esteja plenamente desenvolvida:
1. Write a failing test
2. Make the test pass
3. Refactor and back to 1
### Vantagens do TDD
- melhora a implementação
- facilita implementações mais simples
- facilita a escrita dos testes
- detalhes de implementação frescos na mente
- menor tempo dedicado a _bug fixing_ (não só uma característica do TDD mas também dos testes)
### Desafios
- curva de aprendizado
- maior tempo de desenvolvimento
- difícil de vender ao time de produto (que quer agilidade)
