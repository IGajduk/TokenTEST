var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../db/models');


/* GET home page. */
router.post('/', async function (req, res, next) {
    // console.log(req.body);
    const existedUser = await db.user.findOne({where: {email: req.body.email}});
    console.log(existedUser);
    if (existedUser) {
        res.status(409).json({message: 'Такий email вже зарезервовано!'});
        res.render('index', {title: existedUser.email});
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        try {
            const user = await db.user.create({
                email: req.body.email,
                password: bcrypt.hashSync(password, salt)
            });
            console.log(user);
            res.status(201).json(user);
        } catch (e) {
            // something went wrong
        }
        // res.render('index', {title: user.id});
    }
});

module.exports = router;
