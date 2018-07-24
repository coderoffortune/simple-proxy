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

server.get('/',  Proxy.get,    Proxy.setHeaders, Proxy.sendResponse)
server.post('/', Proxy.post,   Proxy.setHeaders, Proxy.sendResponse)
server.put('/',  Proxy.put,    Proxy.setHeaders, Proxy.sendResponse)
server.del('/',  Proxy.delete, Proxy.setHeaders, Proxy.sendResponse)

module.exports = server
