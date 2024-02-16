const jwt = require('../lib/jwt');
const { SECRET } = require('../config');


exports.authMiddleware = async (req, res, next) => {
    const token = req.cookies['auth'];

    console.log(`auth middleware gen Token, token: ${token}`);

    if (!token) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, SECRET);

        req.user = decodedToken;
        // req.locals.isAuthenticated = true;
        res.locals.user = decodedToken;

        next();
    } catch (err) {
        console.log(err);
        res.clearCookie('auth');
        res.redirect('/auth/login');
        // res.redirect('/');
    }
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/auth/login')
    }

    next();
}