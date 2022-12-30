const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');

router.post('/', user_controller.create);

router.get('/:id', user_controller.read);

router.get('/views/all-users', user_controller.view);

router.put('/:id', user_controller.update);

router.delete('/:id', user_controller.delete);

module.exports = router;