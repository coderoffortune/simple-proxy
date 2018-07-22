let axios = require('axios');

class Proxy {
    constructor() {
        this.forwardHeadersKey = 'Forward-Headers';
    }

    get(req, res, next) {
        const options = {
            headers: req.forwardHeaders
        }

        res.removeHeader('server')
        res.removeHeader('Date')
        res.removeHeader('Connection')
        
        axios
            .get(req.forwardUrl, options)
            .then(response =>  {
                Object.entries(response.headers).map(([key, value]) => 
                    res.header(key, value)
                )

                res.send(response.status, response.data)
            })
            .catch(error => 
                res.send(error.response.status, error.response.statusText)
            )
    }

    post(req, res, next) {
        const options = {
            headers: req.forwardHeaders
        }

        axios
            .post(req.forwardUrl, req.body, options)
            .then(response => {
                Object.entries(response.headers).map(([key, value]) => 
                    res.header(key, value)
                )

                res.send(response.status, response.data)
            })
            .catch(error =>
                res.send(error.response.status, error.response.statusText)
            )
    }

    put(req, res, next) {
        const options = {
            headers: req.forwardHeaders
        }

        axios
            .put(req.forwardUrl, req.body, options)
            .then(response =>  {
                Object.entries(response.headers).map(([key, value]) => 
                    res.header(key, value)
                )

                res.send(response.status, response.data)
            })
            .catch(error => 
                res.send(error.response.status, error.response.statusText)
            )
    }
}

module.exports = Proxy;
