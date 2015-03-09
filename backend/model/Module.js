/**
* Created with bitscontrol.
* User: exciter
* Date: 2014-12-05
* Time: 01:58 AM
*/

var mongoose = require('mongoose');

var moduleSchema = mongoose.Schema({

    name: String,
    code: String,
    public: Boolean,
    owner: String,
    createdOn: { type: Date, default: Date.now },
    active: Boolean,
    static: { type: Boolean, default: false }

});

module.exports = mongoose.model('Module', moduleSchema);
