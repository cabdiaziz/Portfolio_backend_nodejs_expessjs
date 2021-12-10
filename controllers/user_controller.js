const User = require('../models/users')

const bcrypt = require('bcryptjs')
const _ = require('lodash')

//require validation file
const { create_userValidation, userLogin_validation, updateUserValidation } = require('../validations/validation')


//Auth Api functions.

const user_create = async(req, res) => {
    const { error } = create_userValidation(req.body);
    if (error) return res.status(404).send(error.details[0].message)

    try {
        bcrypt.hash(req.body.password, 10, async(err, hash) => {
            if (err) {
                return res.status(500).send({ err });
            } else {
                const user = await User.findOne({ email: req.body.email })
                if (user) return res.status(409).send({ msg: 'user is already created.' })

                const newUser = await new User(_.pick(req.body, ['name', 'email', 'address', 'phone', 'gender', 'password', 'password_confirm']));

                const token = await newUser.generateToken();
                console.log('tokenCREATE=', token) //New token generated.
                res.cookie('auth', token); //sending token via cookies.             

                if (req.body.password !== req.body.password_confirm)
                    return res.status(400).send({ errMsg: 'confirm must match password' })

                newUser.password = hash
                newUser.password_confirm = newUser.password;

                await newUser.save()
                res.status(201).send(_.pick(newUser, ['name', 'email', 'address', 'phone', 'gender', 'status']));
            }
        });
    } catch (err) {
        for (field in err.occur) res.status(400).json(err.occur[field].message);
    }
}

const user_login = async(req, res) => {
    const { error } = userLogin_validation(req.body);
    if (error) return res.status(400).send(error.details[0].message); // test tostring function.
    try {
        res.clearCookie('auth');
        const user = await User.checkPassword(req.body.email, req.body.password);
        if (user.status !== 'active') return res.status(401).send('Please authenticate.')

        if (!user.password) return res.status(401).send('invalid email or password')

        const token = await user.generateToken();
        res.cookie('auth', token);

        await user.save();
        res.status(200).send(_.pick(user, ['name', 'email', 'address', 'phone', 'gender', 'status']))
    } catch (err) {
        for (field in err.occur) res.status(400).json(err.occur[field].message);
    }
}

const user_profile = async(req, res) => {
    try {
        return res.status(200).send(_.pick(req.user, ['name', 'email', 'address', 'phone', 'gender', 'status']))
    } catch (err) {
        for (field in err.occur) res.status(400).json(err.occur[field].message);
    }
}

const logout_accout = async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.clearCookie('auth');
        res.status(200).send('logout seccesfully')
    } catch (err) {
        for (field in err.occur) res.status(400).json(err.occur[field].message);
    }
}

const logout_allaccounts = async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save();

        res.clearCookie('auth');
        res.status(200).send('Loged out for all devices')
    } catch (err) {
        for (field in err.occur) res.status(400).json(err.occur[field].message);
    }
}

//!Delete testing..  admin account can not delete.
const delete_myProfile = async(req, res) => {
    try {
        //* not allowed to delete admin accoutn.
        if (!req.user.type === 'admin') return res.status(400).send('Unable to delete an admin Account!!..')

        await req.user.remove()
            .then(() => res.status(200).send('Your accout has been deleted successfully'))
            .catch(err => console.log(err))
    } catch (err) {
        for (field in err.occur) res.status(400).json(err.occur[field].message);
    }
}

const update_myProfile = async(req, res) => {

    const { error } = updateUserValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'address', 'phone', 'gender', 'type'];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidUpdate) return res.status(400).send({ Error: 'Invalid updates.!' })

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.status(200).send(req.user)
    } catch (err) {
        for (field in err.occur) res.status(400).json(err.occur[field].message);
    }
}

//!feature API'S. 

//*reset password API
//*Change password API


module.exports = {
    //we but inside function name to export.
    user_create,
    user_login,
    user_profile,
    logout_accout,
    logout_allaccounts,
    delete_myProfile,
    update_myProfile
}