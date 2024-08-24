const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const UserModel = require('../models/UserModel');

dotenv.config();
const seckretKey = process.env.SECRET_KEY;

const verifyToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ error: "شما امکان دسترسی به این بخش را ندارید" });
    const token = authorization.split(' '[1]);

    try {
        const { _id } = jwt.verify(token, seckretKey);
        req.user = await UserModel.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        res.status(500).json({ error });
    };
};

module.exports = verifyToken;