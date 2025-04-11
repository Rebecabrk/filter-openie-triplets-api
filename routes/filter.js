const express = require('express');
const filterController = require('../controllers/filterController');

const router = express.Router();

router.post('/', filterController.filterTriplets);

module.exports = router;