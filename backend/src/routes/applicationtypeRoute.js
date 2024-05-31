const express = require('express');
const { postType, getAllTypes } = require('../handlers/applicationtypeHandler');
const router = express();

router.post('/createType', postType);
router.get('/getAll', getAllTypes)

module.exports = router;