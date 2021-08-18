const express = require('express');
const router = express.Router();
const authRouter = require('./auths-router');
const genreRouter = require('./genre-router');
const novelRouter = require('./novel-router');
const profileRouter = require('./profiles-router');
const chapterRouter = require('./chapter-router');
const {hashPassword, enc, rndStr, verifyToken} = require('../helpers/Global');
const uploadFile = require("../middleware/upload");
const path = require('path');
const fs = require('fs');

router.get('/', function(req, res) {
    res.json('Welcome to TNovel Backend Server')
});

router.use('/auth', authRouter);
router.use('/chapter', chapterRouter);
router.use('/profile', profileRouter);
router.use('/genre', genreRouter);
router.use('/novel', novelRouter);

router.get('/middleware-route', verifyToken, function(req, res) {
    res.json('Verify token is successfully')
});

router.post('/bcript-password', async function(req, res) {
    const {password} = req.body;
    try {
        const _bcrypt = await hashPassword(password)
        res.status(200).json({
            message: "Berhasil",
            password: _bcrypt
        })
    } catch (error) {
        res.status(500).json({
            message:
                error.message || "Failed to bcrypt passwotd"
        })
    }
})


/**
 * Testing uploads files with 
 */
router.post('/uploads-test', async function(req, res) {
    console.log(req);
    // try {
    //     await uploadFile(req, res);
    
    //     if (req.file == undefined)
    //         return res.status(400).send({ message: "Please upload a file!" });
    
    return res.status(200).send({
        message: 'req',
    });
    // } catch (err) {
    //     res.status(500).send({
    //         message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    //     });
    // }
})

// router.get('/test-get-photo', function(req, res) {
//     const directoryPath = path.join(__dirname, '/../uploads/');
//     var img = fs.readFile(directoryPath, function (err, data) {
//         var contentType = 'image/png';
//         var base64 = Buffer.from(data).toString('base64');
//         base64 ='data:image/png;base64,'+ base64;
//         return res.status(200).send(base64)
//     });
// })

router.get('/test-get-photo', function(req, res) {
    const directoryPath = path.join(__dirname, '/../uploads/');
    fs.readdir(directoryPath, function (err, files) {
        if (err)
            res.status(500).send({message: "Unable to scan files!"})

        if (files.length < 1)
            res.status(500).send({message: "No Images uploads!"})

        // let fileInfos = [];
        
        // files.forEach((file) => {
        //     fileInfos.push({
        //         name: file,
        //         url: baseUrl + file,
        //     });
        // });
    
        res.status(200).json({files});
    });
});


// const getListFiles = (req, res) => {
//     const directoryPath = path.join(__dirname, '/../uploads/');
    
//     fs.readdir(directoryPath, function (err, files) {
//         if (err)
//             res.status(500).send({message: "Unable to scan files!"});
    
//         let fileInfos = [];
    
//         files.forEach((file) => {
//             fileInfos.push({
//                 name: file,
//                 url: baseUrl + file,
//             });
//         });
    
//         res.status(200).send(fileInfos);
//     });
// };

router.post('/fake-login', async function(req, res) {
    try {
        var log = enc(JSON.stringify(req.body), 1, 6)
        var d = {
            us: log,
            ps: rndStr(log.length, 1, 6)
                .substring(0, log.length)
                .replace(/\W/g, ""),
        };
        res.status(200).json({
            message: d
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

module.exports = router;