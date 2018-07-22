module.exports = {
    headers: (req, res, next) => {
        res.removeHeader('server')
        res.removeHeader('Date')
        res.removeHeader('Connection')

        return next()
    }
}