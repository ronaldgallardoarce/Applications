const express = require('express');
const { getAllRecords, getRecordsByUser } = require('../handlers/recordHandler');
const router = express();
router.get('/getAllRecords', getAllRecords);
router.get('/getRecordsByUser/:userId', getRecordsByUser);

module.exports = router;