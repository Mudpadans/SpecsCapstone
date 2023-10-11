const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const isAuthenticated = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log("Extracted Token:", token)

    if (!token) {
        console.log("No Token found in the header");
        return res.status(403).json({ message: 'Token is required' });
    }

    console.log("SECRET: ", SECRET)

    jwt.verify(token, SECRET, (err, decoded) => {
        if(err) {
            console.log("JWT Verification Error:", err);
            console.log(token, SECRET)
            return res.status(401).json({ message: 'Invalid token', error: err.message });
        } else {
            req.user = decoded;
            next();
        }
    })
}

module.exports = isAuthenticated; 