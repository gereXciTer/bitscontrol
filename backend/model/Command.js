/**
* Created with bitscontrol.
* User: exciter
* Date: 2014-12-05
* Time: 03:35 AM
*/
exports.create = function(mongoose) {
  Command = new mongoose.Schema({
    module: String,
    command: String,
    owner: String,
    createdOn: { type: Date, default: Date.now },
    active: Boolean
  });
  return mongoose.model('Command', Command);
};