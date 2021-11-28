const router = require('express').Router();
const foodController = require('../controllers/foodController');

router.route('/').get(foodController.index);

module.exports = router;