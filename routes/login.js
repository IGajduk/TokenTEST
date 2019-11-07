var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/models');
const tokenKey = 'some-key';

/* GET home page. */
router.post('/', async function(req, res, next) {
try {
    const existedUser = await db.user.findOne({where: {email: req.body.email}});
    if (existedUser) {
        const passwordResult = bcrypt.compareSync(req.body.password, existedUser.password);
        if (passwordResult) {
            const token = jwt.sign({
                email: existedUser.email,
                userId: existedUser.id
            }, tokenKey, {expiresIn: 60 * 60});
            res.status(200).json({
                token: token
            });
        } else {
            res.status(401).json({
                message: "Пароль введений не вірно"
            });
        }
    } else {
        res.status(404).json({
            message: "Користувач з таким email не знайдений!"
        });
    }
    res.render('index', { title: 'Express' });
} catch (e) {
    
}
});

module.exports = router;
