const config = require('./jest.config'); // usando require e não import, pois este arquivo será importado pelo NodeJS

module.exports = {
  ...config,
  testMatch: ['**/?(*.unit.)+(spec|test).[jt]s?(x)']
}
