const { SECRET } = require('../config');
const jwt = require('../lib/jwt');


exports.authMiddleware = async (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, SECRET);

        req.user = decodedToken;
        req.locals.isAuthenticated = true;
        res.locals.user = decodedToken;

        next();
    } catch (err) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
};