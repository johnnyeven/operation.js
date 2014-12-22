var express = require('express');
var router = express.Router();
var host = require('../controllers/host');

router.all('/host/add', host.add);

module.exports = router;
