let axios = require('axios');

class Proxy {
    constructor() {
    }

    get(req, res, next) {
        const url = req.query.url;

        if(!url) {
            res.send(500, {message: 'Missing url'})

            return;
        }

        axios
            .get(url)
            .then(response => 
                res.send(response.status, response.data)
            )
    }
}

module.exports = Proxy;