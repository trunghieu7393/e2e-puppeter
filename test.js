const connect = require('connect');
const serveStatic = require('serve-static');
const Mocha = require('mocha');

const runHttpServer = () => {
  const server = connect();
  server.use(serveStatic(__dirname + '/build'));
  return new Promise((resolve, reject) => {
    server.listen(3000, () => {
      console.log('Server running on 3000');
      return resolve(server)
    });
  });
}; 

const runTest = () => {
  const mocha = new Mocha();
  mocha.addFile('./e2e/todoM.spec.js');
  return new Promise((resolve, reject) => {
    mocha.run(failures => {
      resolve(failures);
    });
  });
};

(async () => {
  // const server = await runHttpServer();
  const failures = await runTest();
  console.log('failures', failures);
  process.exit();
})();
