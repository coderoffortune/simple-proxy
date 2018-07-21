let axios = require('axios');

class Proxy {
    constructor() {
        this.forwardHeadersKey = 'Forward-Headers';
        this.proxyHeaderKey = 'Proxy-Header';
    }

    get(req, res, next) {
        const url = req.query.url;
        let forwardHeaders = JSON.parse(req.header('Forward-Headers', "{}"));
        forwardHeaders = forwardHeaders === {} ? {'Content-Type': req.contentType()} : forwardHeaders;

        if(!url) {
            res.send(500, {message: 'Missing url'})

            return;
        }

        axios
            .get(url, {headers: forwardHeaders})
            .then(response => 
                res.send(response.status, response.data)
            )
    }

    post(req, res, next) {
        const url = req.query.url;
        const forwardHeaders = req.header('Forward-Headers', {
            'Content-Type': req.contentType
        });
        
        if(!url) {
            res.send(500, {message: 'Missing url'})

            return;
        }

        axios
            .post(url, req.body, {headers: forwardHeaders})
            .then(response => 
                req.send(response.status, response.data)
            )
    }
}

module.exports = Proxy;