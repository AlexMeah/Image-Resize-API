module.exports = function (grunt) {
    grunt.registerTask('test', [
        'jshint:all',
        'env:test',
        'mochaTest:test'
    ]);
};
