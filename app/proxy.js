let axios = require('axios');

class Proxy {
    constructor() {
        this.forwardHeadersKey = 'Forward-Headers';
        this.proxyHeaderKey = 'Proxy-Header';
    }

    checkUrlParam(req, res, next) {
        if(!req.query.url) {
            res.send(500, {message: 'Missing url'})

            return;
        }

        next();
    }

    get(req, res, next) {
        const url = req.query.url;
        const headers = this.prepareHeaders(req);

        axios
            .get(url, {headers: headers})
            .then(response => 
                res.send(response.status, response.data)
            )
    }

    post(req, res, next) {
        const url = req.query.url;
        const headers = this.prepareHeaders(req);
        
        axios
            .post(url, req.body, {headers: headers})
            .then(response => 
                res.send(response.status, response.data)
            )
    }

    prepareHeaders(req) {
        let forwardHeaders = JSON.parse(req.header(this.forwardHeadersKey, "{}"));

        return forwardHeaders === {} ? { 'Content-Type': req.contentType() } : forwardHeaders;
    }
}

module.exports = Proxy;