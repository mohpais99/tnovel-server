const express = require('express');
const router = express.Router();
const {verifyToken} = require('../helpers/Global')

const controller = require('../controllers/genre-controller');

router.get('/', controller.listAllGenre);
router.post('/create', verifyToken, controller.createGenre);
router.put('/create/:slug', verifyToken, controller.updateGenre);
router.delete('/delete/:slug', verifyToken, controller.deleteGenre);

module.exports = router;
