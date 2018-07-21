module.exports = {
    forwardHeaders: (req, res, next) => {
        let forwardHeaders = JSON.parse(req.header('Forward-Headers', "{}"))
    
        req.forwardHeaders = forwardHeaders === {} ? { 'Content-Type': req.contentType() } : forwardHeaders
        
        return next()
    },
    forwardUrl: (req, res, next) => {
        if(!req.query.url) {
            res.send(500, {message: 'Missing url'})
    
            return;
        }
    
        req.forwardUrl = req.query.url
    
        return next()
    }
}
