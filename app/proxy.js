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
            .then(response => 
                res.send(response.status, response.data)
            )
    }

    post(req, res, next) {
        const options = {
            headers: req.forwardHeaders
        }

        axios
            .post(req.forwardUrl, req.body, options)
            .then(response => 
                res.send(response.status, response.data)
            )
    }
}

module.exports = Proxy;