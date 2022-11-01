//node.js로 sever 생성
const jsonServer = require('json-server');
//const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router('/data.json');
const middlewares = jsonServer.defaults({
    static: './build/',
});

const port = process.env.PORT || 3001;

server.use(middlewares);

server.use(jsonServer.rewriter({
    "/api/*": "/$1",
}));

server.use(router);
server.listen(port, () => {
    console.log('JSON Server is running');
});