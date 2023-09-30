const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers['Authorization'];

    if (!authHeader) {
        return res.status(403).json({ message: 'Authorization header is missing' })
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).json({ message: 'Invalid token', error: err.message });
        }

        req.user = decoded;
        next();
    })
}

module.exports = isAuthenticated; 