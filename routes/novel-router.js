const express = require('express');
const router = express.Router();
const {verifyToken} = require('../helpers/Global')
const uploadPoster = require("../middleware/poster_upload");

const controller = require('../controllers/novel-controller');

router.get('/', controller.listAllNovel);
router.put('/view/:slug', controller.getNovelBySlug);
router.post('/create', verifyToken, controller.createNovel);
router.post('/upload', verifyToken, uploadPoster, controller.createNovelWithUpload);
router.put('/update/:slug', verifyToken, controller.updateNovel);
router.delete('/delete/:slug', verifyToken, controller.deleteNovel);

module.exports = router;
