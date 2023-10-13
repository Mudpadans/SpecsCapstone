const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const isAuthenticated = (req, res, next) => {
    let token = req.headers.authorization;

    let userId = req.params

    if (!token) {
        console.log("No Token found in the header");
        return res.status(403).json({ message: 'Token is required' });
    }

    token = token.split(' ')[1].replace(/"/g, '');

    console.log("SECRET: ", SECRET)
    console.log("Extracted Token:", token)

    jwt.verify(token, SECRET, (err, decoded) => {
        if(err) {
            console.log(token, SECRET)
            console.log("Decoded JWT:", decoded);
            console.log("JWT Verification Error Message:", err.message);
            console.log("JWT Verification Error Name:", err.name);
            return res.status(401).json({ message: 'Invalid token', error: err.message });
        } else {
            userId = decoded.id;
            
            next();
        }
    })
}

module.exports = isAuthenticated; 