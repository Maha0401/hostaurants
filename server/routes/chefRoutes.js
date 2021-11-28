const router = require('express').Router();
const chefController = require('../controllers/chefController');

router.route('/').get(chefController.index);

module.exports = router;