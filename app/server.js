let restify = require('restify')
let cors    = require('./middlewares/cors')
let extract = require('./middlewares/extract')
let Proxy   = require('./proxy')

const server = restify.createServer()
server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyReader())
server.use(extract.forwardUrl)
server.use(extract.forwardHeaders)

const proxy = new Proxy()

server.get('/',  proxy.get)
server.post('/', proxy.post)

module.exports = server
