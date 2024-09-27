const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        require: true,
        unique: true,
        match: /^[a-z0-9]+$/,
    },
    year: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    confirmPassword: {
        type: String,
        require: true
    },
    data: {
        subjects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject'
        }],
        default: []
    }
})
const unitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const subjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    units: {
        type: [unitSchema],
        default: () => [
            {name: 'Unit 1'},
            {name: 'Unit 2'},
            {name: 'Unit 3'},
            {name: 'Unit 4'},
            {name: 'Unit 5'},
        ]
        
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})





userSchema.pre('save', (next) => {
    this.confirmPassword = undefined;
    next();
})

const Subject = mongoose.model('Subject', subjectSchema);

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    Subject
};