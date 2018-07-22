let restify = require('restify')
let cors    = require('./middlewares/cors')
let extract = require('./middlewares/extract')
let cleanup = require('./middlewares/cleanup-headers')
let Proxy   = require('./proxy')

const server = restify.createServer()

server.pre(cors.preflight)
server.use(cors.actual)

server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyReader())

server.use(extract.forwardUrl)
server.use(extract.forwardHeaders)

server.use(cleanup.headers)

const proxy = new Proxy()

server.get('/',  proxy.get,  proxy.setHeaders, proxy.sendResponse)
server.post('/', proxy.post, proxy.setHeaders, proxy.sendResponse)
server.put('/',  proxy.put,  proxy.setHeaders, proxy.sendResponse)


module.exports = server
