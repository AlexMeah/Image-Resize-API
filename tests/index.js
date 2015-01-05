require('chai').should();
var request = require('supertest');
var fs = require('fs');
var path = require('path');

describe('Image Resize API', function () {
    var app = require('../app/app.js');

    before(function () {
        try {
            fs.unlinkSync(__dirname + '/../app/assets/uploads/200/200/1.jpeg');
        } catch (_) {}
    });

    it('should resize images by request using sharp', function (done) {
        request(app)
            .get('/200/200/1.jpeg')
            .expect(200)
            .expect('X-Serving-Method', 'Sharp')
            .end(done);
    });

    it('should resize images by request using sendfile', function (done) {
        request(app)
            .get('/200/200/1.jpeg')
            .expect(200)
            .expect('X-Serving-Method', 'Cache')
            .end(done);
    });
});
