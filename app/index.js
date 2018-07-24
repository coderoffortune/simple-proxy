let server = require('./server')

server.listen(9999, function() {
    console.log('%s listening at %s', server.name, server.url);
})
