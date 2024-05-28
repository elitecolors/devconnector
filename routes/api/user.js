const express = require('express');
const router = express.Router();
const gravatr = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

let User = require('../../models/User');

router.post('/',
    [
        check('name', 'name is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
        check('password','').isLength({min: 6, max: 8}),
    ],
    async (req, res) =>
{
    const errors= validationResult(req);

    if (! errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        })
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({'errors': 'User already exists'});
        }

        const avatar = gravatr.url(email, {
            s : '200',
            r : 'pg',
            d: 'mm'
        })

        User = new User({ name, email, avatar, password });

        const salt = await bcrypt.genSalt(10);

        User.password = await bcrypt.hash(password, salt);

        await User.save();

        res.send('user registred');

    } catch (err) {
        console.error(err.message);
        return res.status(500).send('server error');
    }


});

module.exports = router;
