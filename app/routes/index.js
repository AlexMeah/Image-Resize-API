var express = require('express');
var router = express.Router();
var sharp = require('sharp');
var path = require('path');
var fs = require('fs-extra');
sharp.concurrency(4);

/* GET home page. */
router.get('/:width/:height/:hotelImage', function (req, res, next) {
    res.set({
        'Content-Type': 'image/jpeg',
        'X-Serving-Method': 'Cache'
    });

    var fileName = path.join(__dirname, '../assets/uploads/', req.params.width, req.params.height, req.params.hotelImage);

    res.sendFile(fileName, function (err) {
        if (err) {
            res.set('X-Serving-Method', 'Sharp');
            console.log('Converting base image...');
            sharp(path.join(__dirname, '../assets/uploads/', req.params.hotelImage)).resize(parseFloat(req.params.width), parseFloat(req.params.height)).quality(80).withoutEnlargement().toBuffer().then(function success(img) {
                res.send(img);

                fs.outputFile(path.join(__dirname, '../assets/uploads/', req.params.width, req.params.height, req.params.hotelImage), img, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }, function error(err) {
                return next(err);
            });
        } else {
            console.log('Sent cached file:', fileName);
        }
    });
});

module.exports = router;
