const express = require('express');
const { postUser, authLogin, getAllUsers } = require('../handlers/userHandler');
const { validToken } = require('../services/jwtservice');
const router = express();

router.post('/createUser', postUser);
router.post('/login', authLogin);
router.post('/validate/token', validToken);
router.get('/getAll', getAllUsers)
router.get('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: 'You have successfully logged out'
    })
});

module.exports = router;