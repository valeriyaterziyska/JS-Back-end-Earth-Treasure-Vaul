const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [10, 'Email should be at leat 10 characters!'],
    },
    password: {
        type: String,
        required: true,
        minLength: [4, 'Password should be at leat 4 characters!'],
    }
});

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 12);
});

// Check password and repassword in authService;
// userSchema.virtual('rePassword')
//     .set(function(value) {
//         if(value !== this.password) {
//             throw new Error('Password missmatch');
//         }
//     });

const User = mongoose.model('User', userSchema);

module.exports = User;