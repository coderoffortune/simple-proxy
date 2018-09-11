const debug = require('debug')('simple-proxy')
let server = require('./server')

server.listen(9999, function() {
    debug('%s listening at %s', server.name, server.url)
})
