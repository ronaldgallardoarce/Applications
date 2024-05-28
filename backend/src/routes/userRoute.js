const express = require('express');
const { postUser } = require('../handlers/userHandler');
const router = express();

router.get('/createUser', postUser);

module.exports = router;