'use strict';
module.exports = function(field) {
    return {
        exception: 'NotFoundException',
        message: field + ' not found.'
    };
};