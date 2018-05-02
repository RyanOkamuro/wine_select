'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/wine-select';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-wine-select';
exports.PORT = process.env.PORT || 8080;