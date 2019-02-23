var utils = require('utils');
var harvester = require('role_harvester');
var builder = require('role_builder');
var upgrader = require('role_upgrader');

module.exports.loop = function () {

    if(Memory.initialize == undefined){
        utils.init();
    }

    utils.spawnNewCreeps();


    for(var name in Game.creeps) {
       var creep = Game.creeps[name];
       if(creep.memory.role == 'harvester') {
           harvester.run(creep);
       }
       if(creep.memory.role == 'builder'){
           builder.run(creep);
       }
       if(creep.memory.role == 'upgrader'){
           upgrader.run(creep);
       }
   }
}
