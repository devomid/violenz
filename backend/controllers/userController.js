const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const crypto = require('crypto');
const Kavenegar = require('kavenegar');

dotenv.config();
const secretKey = process.env.SECRET_KEY;
const verificationCode = crypto.randomInt(1000000);
const createToken = function (_id) {
    return jwt.sign({ _id }, secretKey, { expiresIn: '3d' });
};
const kavenegarAPI = Kavenegar.KavenegarApi({
    apikey: process.env.KAVE_NEGAR_API_KEY
});

const signupUser = async (req, res) => {
    const {
        name,
        lastName,
        idNo,
        phoneNumber,
        email,
        password,
    } = req.body;

    try {
        const phoneNumberExists = await UserModel.findOne({ phoneNumber });
        if (phoneNumberExists) return res.status(400).json({ error: "شماره موبایل وارد شده قبلا استفاده شده است" });

        const emailExists = await UserModel.findOne({ email });
        if (emailExists) return res.status(400).json({ error: "ایمیل وارد شده قبلا استفاده شده است" });

        const socialIdNumberExists = await UserModel.findOne({ idNo });
        if (socialIdNumberExists) return res.status(400).json({ error: "شماره ملی وارد شده قبل استفاده شده است" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await UserModel.create({
            name, lastName, socialIdNumber: idNo, phoneNumber, email, password: hashedPassword
            // verificationCode
        });

        console.log(user);

        const token = createToken(user._id);
        console.log(token);

        kavenegarAPI.VerifyLookup({
            receptor: String(phoneNumber),
            token: String(verificationCode),
            token2: name,
            token3: "vioLenz",
            template: "vioLenzSignup"
        }, function (response, status) {
            console.log('response', response);
            console.log('status', status);
            res.status(201).json({ user, token, message: 'حساب کاربری شما ساخته شد. لطفا مرحله تایید پیامکی را تکمیل کنید' });
        });

    } catch (error) {
        return res.status(500).json({ message: "خطایی پیش آمده", error });
    };
};


const signinUser = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        const user = await UserModel.findOne({ phoneNumber });
        if (!user) {
            res.status(400).json({ error: "شماره وارد شده حساب کاربری ندارد" });
        } else {
            const token = createToken(user._id);
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(401).json({ error: "پسورد وارد شده صحیح نمیباشد" });
            } else {
                kavenegarAPI.VerifyLookup({
                    receptor: String(phoneNumber),
                    token: String(verificationCode),
                    token2: user.name,
                    token3: "vioLenz",
                    template: "vioLenzSignup"
                }, function (response, status) {
                    res.status(200).json({ user, token, authStat: true })
                });
            };
        };
    } catch (error) {
        return res.status(500).json({ message: "خطایی پیش آمده", error });
    };
};


const verifyUser = async (req, res) => {
    try {
        const {
            phoneNumber,
            enteredVerificationCode
        } = req.body;

        const user = await UserModel.findOne({ phoneNumber });

        if (!user) {
            res.status(400).json({ error: "شماره وارد شده حساب کاربری ندارد" });
        } else {
            if (user.verificationCode === enteredVerificationCode) {
                res.status(200).json({ message: "تایید پیامکی با موقفیت انجام شد" });
                user.verified = true;
                await user.save();

            } else res.status(401).json({ error: "کد تایید اشتباه است. لطفا دوباره با کد صحیح امتحان کنید" });
        };
    } catch (error) {
        return res.status(500).json({ message: "خطایی پیش آمده", error });
    };
};

module.exports = {
    signupUser,
    signinUser,
    verifyUser
};


