const mongoose = require('mongoose');

const Schema = mongoose.Schema();

const OperatorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    parentCompany: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    gender: {
        type: Boolean,
        required: true
    },
    avatar: {
        type: String,
    },
    birthDate: {
        type: Date
    },
    managerPermission: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('OperatorModel', OperatorSchema);