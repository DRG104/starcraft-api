// import dependencies
const mongoose = require('mongoose')

// toy, is a subdocument NOT A MODEL
// toy will be part of the toys array added to specific pets

// we don't, DO NOT, need to get the model from mongoose, so we're going to save a little real estate in our file and skip destructuring in favor of the regular syntax
const statSchema = new mongoose.Schema({
    HP: {
        type: Number,
        required: true
    },
    Shields: {
        type: Number,
        required: true
    },
    Damage: {
        type: Number,
        required: true
    },
    Ability: {
        type: String,
        required: false
    },
    Rank: {
        type: String,
        // here we're going to use enum, which means we can only use specific strings to satisfy this field
        // enum is a validator on the type String, that says "you can only use one of these values"
        enum: [
            'Disciple',
            'Mentor',
            'Instructor',
            'Master',
            'Executor'
        ],
        default: 'Disciple'
    }
}, {
    timestamps: true
})

module.exports = statSchema