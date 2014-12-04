/**
* Created with bitscontrol.
* User: exciter
* Date: 2014-12-04
* Time: 01:00 AM
*/
var modules = {
  body: function(){
    return {
      public: function (){
        var self = this;
        return {
          coords: {x: 0, y: 0, z: 0},
          getModule: function(name){
            return self.getModule(name);
          }
        };
      },
      getModules: function(){
        return modules;
      },
      registerModule: function(name, params){
        this.modules[name] = params;
      },
      getModule: function(name){
        var modules = this.getModules();
        if(modules[name]){
          return modules[name]();
        }
      }
    }
  },
  engine: require('./engine.js')
};

module.exports = modules;
