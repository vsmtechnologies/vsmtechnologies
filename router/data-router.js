const express = require('express');
const router = express.Router();

const appController = require('../controllers/app-controller');

router.route('/app').get(appController.getAppData);

module.exports = router; 