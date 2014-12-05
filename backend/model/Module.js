/**
* Created with bitscontrol.
* User: exciter
* Date: 2014-12-05
* Time: 01:58 AM
*/
exports.create = function(mongoose) {
  Module = new mongoose.Schema({
    name: String,
    command: String,
    owner: String,
    createdOn: { type: Date, default: Date.now },
    active: Boolean
  });
  return mongoose.model('Module', Module);
};