let restify = require('restify');
let cors = require('./middlewares/cors');
let server = restify.createServer();

let Proxy = require('./proxy');
const proxy = new Proxy();

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.queryParser());

server.get('/',  proxy.get);
server.post('/', proxy.post);

module.exports = server;