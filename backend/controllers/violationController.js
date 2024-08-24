const cloudinary = require('cloudinary');
const ViolationModel = require('../models/ViolationModel');
const dotenv = require('dotenv');
const UserModel = require('../models/UserModel');

dotenv.config();
const cloudinaryName = process.env.CLOUD_NAME;
const cloudinaryApiKey = process.env.CLOUD_API_KEY;
const cloudinaryApiSecret = process.env.CLOUD_API_SECRET;

const violationSend = async (req, res) => {
    cloudinary.config({
        cloud_name: cloudinaryName,
        api_key: cloudinaryApiKey,
        api_secret: cloudinaryApiSecret
    });

    try {

        const {
            carPlateNumber,
            violationType,
            violationGeoLocation,
            violationPicture,
            userId
        } = req.body;

        const cloudinaryResult = await cloudinary.v2.uploader.upload(violationPicture, {
            folder: "vioLenze/violations"
        });
        const cloudinaryURL = cloudinaryResult.secure_url;
        const user = await UserModel.findOne({ userId });

        if (!user) {
            return res.status(404).json({ error: "کاربر یافت نشد" });
        } else {
            const newViolation = new ViolationModel({
                carPlateNumber,
                violationType,
                violationGeoLocation,
                violationPicture: cloudinaryURL,
                userRegisteredViolation: user
            });
            await newViolation.save();

            return res.status(201).json({ user, newViolation, message: "تخلف با موفقیت ثبت و ارسال شد" });
        }
    } catch (error) {
        return res.status(500).json({ message: "خطایی پیش آمده", error });
    };
};

const getViolations = async (req, res) => {
    const { phoneNumber } = req.params
    const user = await UserModel.findOne({ phoneNumber });

    if (!user) {
        return res.status(404).json({ error: "کاربر یافت نشد" });
    } else {
        try {
            const userViolations = await ViolationModel.find({ userRegisteredViolation: user._id })
                .sort({ createdAt: -1 });

            res.status(200).json({ userViolations, user });

        } catch (error) {
            return res.status(500).json({ message: "خطایی پیش آمده", error });
        };
    };
};

const editViolations = async (req, res) => {
    const { violationId } = req.params;
    const {
        phoneNumber,
        carPlateNumber,
        violationType } = req.body

    try {
        const user = await UserModel.findOne({ phoneNumber });
        if (!user) {
            return res.status(404).json({ error: "کاربر یافت نشد" });
        } else {
            const violationToEdit = await ViolationModel.findByIdAndUpdate({ _id: violationId, userRegisteredViolation: user._id }, { carPlateNumber, violationType }, { new: true });

            violationToEdit ? (
                res.status(200).json({ violationToEdit, message: "تخلف با موفقیت اصلاح شد" })
            ) : (
                res.stat(404).json({ message: "تخلف مورد نظر پیدا نشد" })
            );
        };

    } catch (error) {
        return res.status(500).json({ message: "خطایی پیش آمده", error });
    };
};

const deleteViolations = async (req, res) => {
    const { violationId } = req.params;
    const {
        phoneNumber,
    } = req.body

    try {
        const user = await UserModel.findOne({ phoneNumber });
        if (!user) {
            return res.status(404).json({ error: "کاربر یافت نشد" });
        } else {
            const violationToEdit = await ViolationModel.findByIdAndDelete({ _id: violationId, userRegisteredViolation: user._id });

            violationToEdit ? (
                res.status(200).json({ violationToEdit, message: "تخلف با موفقیت حذف شد" })
            ) : (
                res.stat(404).json({ message: "تخلف مورد نظر پیدا نشد" })
            );
        };

    } catch (error) {
        return res.status(500).json({ message: "خطایی پیش آمده", error });
    };
};
const violationConfirm = async (req, res) => { };
const violationDeny = async (req, res) => { };

module.exports = {
    violationSend,
    getViolations,
    editViolations,
    deleteViolations,
    violationConfirm,
    violationDeny
};
