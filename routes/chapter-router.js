const express = require('express');
const router = express.Router();
const {verifyToken} = require('../helpers/Global')

const controller = require('../controllers/chapters-controller');

router.get('/', controller.listAllChapter);
router.post('/create', verifyToken, controller.createChapter);
router.put('/view/:typenovel/:slug', controller.getChapterBySlug);
router.put('/update/:typenovel/:slug', verifyToken, controller.updateChapter);
router.delete('/delete/:typenovel/:slug', verifyToken, controller.deleteChapter);

module.exports = router;
