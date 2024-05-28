const { Router } = require('express');
const userRoute = require('./userRoute');
const uploadRoute = require('./uploadRoute');
const router = Router()

router.use('/user', userRoute)
router.use('/upload', uploadRoute);

module.exports = router