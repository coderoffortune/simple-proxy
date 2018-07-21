let restify = require('restify');
let cors    = require('./middlewares/cors');
let Proxy   = require('./proxy');

const server = restify.createServer();
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.queryParser());

const proxy = new Proxy();

server.get('/',  proxy.checkUrlParam, (req, res, next) => proxy.get(req, res, next));
server.post('/', proxy.checkUrlParam, (req, res, next) => proxy.post(req, res, next));

module.exports = server;