const { Router } = require('express');
const userRoute = require('./userRoute');
const uploadRoute = require('./uploadRoute');
const recordRoute = require('./recordRoute');
const applicationtypeRoute = require('./applicationtypeRoute');
const router = Router()

router.use('/user', userRoute)
router.use('/upload', uploadRoute);
router.use('/record', recordRoute);
router.use('/type', applicationtypeRoute);

module.exports = router