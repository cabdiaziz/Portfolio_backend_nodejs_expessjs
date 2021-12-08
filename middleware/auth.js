const Admin = require('../models/admins')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
require("dotenv").config();
const env = process.env;

module.exports = async function(req, res, next) {
    try {
        const token = req.cookies.auth;
        if (!token) throw new Error();

        const decodeToken = jwt.verify(token, env.TOKEN_KEY)
        const admin = await Admin.findOne({ _id: decodeToken._id, 'tokens.token': token })
        if (!admin) throw new Error();

        req.token = token
        req.admin = admin
        next()
    } catch (e) {
        return res.status(401).send('Please authenticate.')
    }
}