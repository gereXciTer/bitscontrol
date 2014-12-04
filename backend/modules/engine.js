/**
* Created with bitscontrol.
* User: exciter
* Date: 2014-12-04
* Time: 12:56 AM
*/
module.exports = function(params) {
  return {
    engineOn: false,
    on: function(){
      this.engineOn = true;
      return "engine on";
    },
    stop: function(){
      this.engineOn = false;
      return "engine stop";
    },
    move: function(coords, angle, distance){
      if(this.engineOn){
        var radians = angle * Math.PI / 180.0;
        coords.x = coords.x + Math.cos(radians) * distance;
        coords.y = coords.y + Math.sin(radians) * distance;
      }
    }
  };
}