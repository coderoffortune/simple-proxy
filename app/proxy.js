let axios = require('axios');

class Proxy {
    static get(req, res, next) {
        axios
            .get(req.forwardUrl, {headers: req.forwardHeaders})
            .then(response =>  {
                res.proxiedResponse = response

                return next()
            })
            .catch(error => {
                res.proxiedResponse = Proxy.prepareErrorResponse(error.response)

                return next()
            })
    }

    static post(req, res, next) {
        axios
            .post(req.forwardUrl, req.body, {headers: req.forwardHeaders})
            .then(response => {
                res.proxiedResponse = response

                return next()
            })
            .catch(error => {
                res.proxiedResponse = Proxy.prepareErrorResponse(error.response)

                return next()
            })
    }

    static put(req, res, next) {
        axios
            .put(req.forwardUrl, req.body, {headers: req.forwardHeaders})
            .then(response =>  {
                res.proxiedResponse = response

                return next()
            })
            .catch(error => {
                res.proxiedResponse = Proxy.prepareErrorResponse(error.response)

                return next()
            })
    }

    static delete(req, res, next) {
        axios
            .delete(req.forwardUrl, req.body, {headers: req.forwardHeaders})
            .then(response =>  {
                res.proxiedResponse = response

                return next()
            })
            .catch(error => {
                res.proxiedResponse = Proxy.prepareErrorResponse(error.response)

                return next()
            })
    }

    static prepareErrorResponse(response) {
        return {
            headers: response.headers,
            status: response.status,
            data: response.statusText
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
