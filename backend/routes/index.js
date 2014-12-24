var express = require('express');
var router = express.Router();
var host = require('../controllers/host');

router.all('/host/add', host.add);
router.all('/host/list', host.read);
router.all('/host/delete', host.delete);

module.exports = router;
