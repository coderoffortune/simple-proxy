process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const debug = require('debug')('simple-proxy')
let axios = require('axios');

class Proxy {
    static get(req, res, next) {
        debug('GET: %s\n\t Forward headers', req.forwardUrl, req.forwardHeaders)

        axios
            .get(req.forwardUrl, {headers: req.forwardHeaders})
            .then(response =>  {
                res.proxiedResponse = response

                return next()
            })
            .catch(error => {
                debug('Error:', error.code)

                res.proxiedResponse = Proxy.prepareErrorResponse(error.response)

                return next()
            })
    }

    static post(req, res, next) {
        debug('POST: %s\n\t Forward headers', req.forwardUrl, req.forwardHeaders)

        axios
            .post(req.forwardUrl, req.body, {headers: req.forwardHeaders})
            .then(response => {
                res.proxiedResponse = response

                return next()
            })
            .catch(error => {
                debug('Error:', error.code)

                res.proxiedResponse = Proxy.prepareErrorResponse(error.response)

                return next()
            })
    }

    static put(req, res, next) {
        debug('PUT: %s\n\t Forward headers', req.forwardUrl, req.forwardHeaders)

        axios
            .put(req.forwardUrl, req.body, {headers: req.forwardHeaders})
            .then(response =>  {
                res.proxiedResponse = response

                return next()
            })
            .catch(error => {
                debug('Error:', error.code)

                res.proxiedResponse = Proxy.prepareErrorResponse(error.response)

                return next()
            })
    }

    static delete(req, res, next) {
        debug('DELETE: %s\n\t Forward headers', req.forwardUrl, req.forwardHeaders)

        axios
            .delete(req.forwardUrl, req.body, {headers: req.forwardHeaders})
            .then(response =>  {
                res.proxiedResponse = response

                return next()
            })
            .catch(error => {
                debug('Error:', error.code)

                res.proxiedResponse = Proxy.prepareErrorResponse(error.response)

                return next()
            })
    }

    static prepareErrorResponse(response) {
        if(response) {
            return {
                headers: response.headers,
                status: response.status,
                data: response.statusText
            }    
        } else {
            return {
                headers: null,
                status: null,
                data: 'An unknown error happened'
            }
        }
    }

    static setHeaders(req, res, next) {
        Object.entries(res.proxiedResponse.headers)
            .filter( ([key, value]) => 
                key !== 'transfer-encoding' 
            )
            .map( ([key, value]) => {
                res.setHeader(key, value) 
            })

        return next()
    }

    static sendResponse(req, res, next) {
        res.send(res.proxiedResponse.status, res.proxiedResponse.data)

        return next()
    }
}

module.exports = Proxy;
