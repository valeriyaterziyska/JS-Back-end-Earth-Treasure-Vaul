const mongoose = require('mongoose');

const stoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'Name should be at leat 2 characters!'],
    },
    category: {
        type: String,
        required: true,
        minLength: [3, 'Category should be at leat 3 characters!'],
    },
    color: {
        type: String,
        required: true,
        minLength: [2, 'Color should be at leat 2 characters!'],
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator(value) { 
                return /^https?:\/\//.test(value) 
            },
            message: (props) => `${props.value} is invalid url for the stoneImage!`
        }
    },
    location: {
        type: String,
        required: true,
        minLength: [5, 'Location should be at leat 5 characters!'],
        maxLength: [15, 'Location should be maximum 15 characters!'],
    },
    formula: {
        type: String,
        required: true,
        minLength: [3, 'Formula should be at leat 3 characters!'],
        maxLength: [30, 'Formula should be maximum 30 characters!'],
    },
    description: {
        type: String,
        required: true,
        minLength: [10, 'Description should be at leat 10 characters!'],
    },
    likedList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});


const Stone = mongoose.model('Stone', stoneSchema);

module.exports = Stone;