const jsonServer = require('json-server');
const server = jsonServer.create();

const fs = require("fs")
const path = require("path")
const db = JSON.parse(fs.readFileSync(path.join("db.json")))

const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router);
server.listen(3001, () => {
    console.log('JSON Server is running');
});


module.exports = server;