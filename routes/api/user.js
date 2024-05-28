const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.post('/',
    [
        check('name', 'name is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
        check('password','').isLength({min: 6, max: 8}),
    ],
    (req, res) =>
{
    const errors= validationResult(req);

    if (! errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        })
    }
    const email = req.body.email;
    console.log(req.body);
    res.send('user route')
});

module.exports = router;
