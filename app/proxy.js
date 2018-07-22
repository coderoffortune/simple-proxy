let axios = require('axios');

class Proxy {
    constructor() {
    }

    get(req, res, next) {
        const options = {
            headers: req.forwardHeaders
        }
        
        axios
            .get(req.forwardUrl, options)
            .then(response =>  {
                res.proxiedResponse = response

                next()
            })
            .catch(error => {
                res.proxiedResponse = {
                    headers: error.response.headers,
                    status: error.response.status,
                    data: error.response.statusText
                }

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
                res.proxiedResponse = response

                return next()
            })
            .catch(error => {
                res.proxiedResponse = {
                    headers: error.response.headers,
                    status: error.response.status,
                    data: error.response.statusText
                }

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
                res.proxiedResponse = response

                return next()
            })
            .catch(error => {
                res.proxiedResponse = {
                    headers: error.response.headers,
                    status: error.response.status,
                    data: error.response.statusText
                }

                return next()
            })
    }

    setHeaders(req, res, next) {
        Object.entries(res.proxiedResponse.headers)
            .filter( ([key, value]) => 
                key !== 'transfer-encoding' 
            )
            .map( ([key, value]) => {
                res.setHeader(key, value) 
            })

        return next()
    }

    sendResponse(req, res, next) {
        res.send(res.proxiedResponse.status, res.proxiedResponse.data)

        return next()
    }

}

module.exports = Proxy;
