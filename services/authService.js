const User = require('../models/User');
const jwt = require('../lib/jwt');
const bcrypt = require('bcrypt');

const SECRET = 'ajshdkayi7gdkchbjbhdaygteqw24y7';

exports.register = (userData) => {
    if (userData.password !== userData.rePassword) {
        throw new Error('Password');
    }

    const user = User.findOne({ email: userData.email });

    if (user) {
        throw new Error('User already exists');
    }

    return User.create(userData);
}

exports.login = async ({ email, password }) => {
    // Get user from DB
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Email or password is invalid!');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {

    }

    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    }

    const token = await jwt.sign(payload, SECRET, { expiresIn: '2h' });
    return token;
};