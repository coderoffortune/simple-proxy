let axios = require('axios');

class Proxy {
    constructor() {
        this.forwardHeadersKey = 'Forward-Headers';
    }

    get(req, res, next) {
        const options = {
            headers: req.forwardHeaders
        }
        
        axios
            .get(req.forwardUrl, options)
            .then(response =>  {
                Object.entries(response.headers)
                    .filter(([key, value]) => key !== 'transfer-encoding' )
                    .map(([key, value]) => res.header(key, value) )

                res.send(response.status, response.data)

                return next()
            })
            .catch(error => {
                Object.entries(error.response.headers)
                    .filter(([key, value]) => key !== 'transfer-encoding' )
                    .map(([key, value]) => res.header(key, value) )

                res.send(error.response.status, error.response.statusText)

                return next()
            })
    }

    post(req, res, next) {
        const options = {
            headers: req.forwardHeaders
        }

        axios
            .post(req.forwardUrl, req.body, options)
            .then(response => {
                Object.entries(response.headers)
                    .filter(([key, value]) => key !== 'transfer-encoding' )
                    .map(([key, value]) => res.header(key, value) )

                res.send(response.status, response.data)

                return next()
            })
            .catch(error => {
                Object.entries(error.response.headers)
                    .filter(([key, value]) => key !== 'transfer-encoding' )
                    .map(([key, value]) => res.header(key, value) )

                res.send(error.response.status, error.response.statusText)

                return next()
            })
    }

    put(req, res, next) {
        const options = {
            headers: req.forwardHeaders
        }

        axios
            .put(req.forwardUrl, req.body, options)
            .then(response =>  {
                Object.entries(response.headers)
                    .filter(([key, value]) => key !== 'transfer-encoding' )
                    .map(([key, value]) => res.header(key, value) )

                res.send(response.status, response.data)

                return next()
            })
            .catch(error => {
                Object.entries(error.response.headers)
                    .filter(([key, value]) => key !== 'transfer-encoding' )
                    .map(([key, value]) => res.header(key, value) )

                res.send(error.response.status, error.response.statusText)

                return next()
            })
    }
}

module.exports = Proxy;
