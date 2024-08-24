const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ViolationSchema = new Schema({
    carPlateNumber: {
        type: String,
        required: true,
        trim: true
    },
    violationType: {
        type: String,
        required: true,
        trim: true
    },
    carColor: {
        type: String,
        trim: true
    },
    carBrand: {
        type: String,
        trim: true
    },
    violationGeoLocation: {
        type: String,
        required: true,
    },
    violationPicture: {
        type: String,
        required: true
    },
    violationDateAndTime: {
        type: Date
    },
    userRegisteredViolation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    },
    operatorConfirmedViolation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OperatorModel',
    },
    confirmationStatus: {
        type: String,
        default: 'unconfirmed',
        required: true
    },
    denialCause: {
        type: String,
    },
},
    { timestamps: true });

module.exports = mongoose.model('ViolationModel', ViolationSchema);