export function errorHandler(err, req, res, next) {
    if(err.statusCode) return res.status(err.statusCode).json({error: err.message});

    res.status(500).json({ error: 'Internal Server Error' });
}
