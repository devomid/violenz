const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    socialIdNumber: {
        type: Number,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    // gender: {
    //     type: Boolean,
    //     required: true
    // },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    birthDate: {
        type: Date
    },
    bio: {
        type: String,
        default: null
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String,
    },
    confirmedViolations: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ViolationModel"
    },
    unConfirmedViolations: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ViolationModel"
    }
});

module.exports = mongoose.model('UserModel', UserSchema);