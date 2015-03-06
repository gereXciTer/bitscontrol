/**
* Created with bitscontrol.
* User: exciter
* Date: 2014-12-05
* Time: 03:35 AM
*/

var mongoose = require('mongoose');

var commandSchema = mongoose.Schema({

    module: String,
    command: String,
    name: {type: String, required: true},
    owner: String,
    createdOn: { type: Date, default: Date.now },
    active: Boolean

});

module.exports = mongoose.model('Command', commandSchema);
