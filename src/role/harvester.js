var harvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN && structure.energy < structure.energyCapacity)
                        || (structure.structureType == STRUCTURE_CONTAINER && _.sum(structure.store) < structure.storeCapacity);
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                // Move to somewhere safe
                var rest = creep.room.find(FIND_FLAGS, {filter: (flag) => {return flag.name == 'Rest'}});
                creep.moveTo(rest[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

module.exports = harvester;
