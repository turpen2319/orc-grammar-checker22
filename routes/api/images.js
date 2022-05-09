const express = require('express');
const router = express.Router();
const imagesCtrl = require('../../controllers/api/images');

//all routes prepended with 'api/images'
router.get('/', imagesCtrl.index);
router.post('/', imagesCtrl.create);
router.get('/:id', imagesCtrl.show);

module.exports = router;