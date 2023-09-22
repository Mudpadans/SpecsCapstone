const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const isAuthenticated = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = decoded;
        next();
    })
}

module.exports = isAuthenticated; 