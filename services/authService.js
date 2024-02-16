const jwt = require('../lib/jwt');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { SECRET } = require('../config');

exports.register = async (userData) => {
    if (userData.password !== userData.rePassword) {
        throw new Error('Password missmatch');
    }

    const user = await User.findOne({ email: userData.email });

    if (user) {
        throw new Error('User already exists');
    }

    const createdUser = await User.create(userData);
    const token = await generateToken(createdUser);
    return token;
}

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Email or password is invalid!');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Email or password is invalid');
    }

    const token = await generateToken(user);
    return token;
};

function generateToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    }

    return jwt.sign(payload, SECRET, { expiresIn: '2h' });
};