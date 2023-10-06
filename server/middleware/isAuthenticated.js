const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(req.headers);

    if (!authHeader) {
        console.log("No Authorization header found");
        return res.status(403).json({ message: 'Authorization header is missing' })
    }

    const token = authHeader.split(' ')[1];
    console.log("Extracted Token:", token)

    if (!token) {
        console.log("No Token found in the header");
        return res.status(403).json({ message: 'Token is required' });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if(err) {
            console.log("JWT Verification Error:", err);
            return res.status(401).json({ message: 'Invalid token', error: err.message });
        }

        req.user = decoded;
        next();
    })
}

module.exports = isAuthenticated; 