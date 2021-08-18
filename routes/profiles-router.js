const express = require('express');
const router = express.Router();
const {verifyToken} = require('../helpers/Global')
const uploadFile = require("../middleware/upload");

const controller = require('../controllers/profile-controller');

router.put('/:id', controller.findProfielById);
router.post('/update-data', verifyToken, controller.updateProfileData);
router.post('/update-photo', verifyToken, uploadFile, controller.uploadProfilePhoto);

module.exports = router;