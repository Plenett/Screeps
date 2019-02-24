var utils = require('utils');
var harvester = require('role_harvester');
var builder = require('role_builder');
var upgrader = require('role_upgrader');

module.exports.loop = function () {

    if(Memory.initialize == undefined){
        utils.init();
    }

    for(var spawn in Game.spawns){
        utils.spawnNewCreeps(spawn);
    }

    utils.buildNewStructure();

    for(var name in Game.creeps) {
       var creep = Game.creeps[name];
       if(creep.memory.role == 'harvester') {
           var targets = creep.room.find(FIND_STRUCTURES, {
               filter: (structure) => {
                   return (structure.structureType == STRUCTURE_SPAWN && structure.energy < structure.energyCapacity)
                       || (structure.structureType == STRUCTURE_CONTAINER && _.sum(structure.store) < structure.storeCapacity);
               }});
            if(targets.length > 0)
                harvester.run(creep);
            else
                builder.run(creep);
       }
       if(creep.memory.role == 'builder'){
           builder.run(creep);
       }
       if(creep.memory.role == 'upgrader'){
           //upgrader.run(creep);
       }
   }
}
