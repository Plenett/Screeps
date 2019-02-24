var utils = {

    spawnNewCreeps: function(spawn) {

        const maxHarvester = 2;
        const maxBuilder = 1;
        const maxUpgrader = 1;

        // Delete memory of dead creeps
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }

        // Retrieve creeps number for each role
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room == Game.spawns[spawn].room);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room == Game.spawns[spawn].room);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room == Game.spawns[spawn].room);


        if(Game.spawns[spawn].spawning) {
            // Display spawning
            Game.spawns[spawn].room.visual.text(
                '🛠️',
                Game.spawns[spawn].pos.x + 1,
                Game.spawns[spawn].pos.y,
                {align: 'left', opacity: 0.8});
        }else{
            // Spawns creep (the order is important)
            var newName = 'Creep' + Memory.nbrCreep;
            if(harvesters.length < maxHarvester) {
                Memory.nbrCreep++
                // TODO: Change Spawn1 to generic name
                Game.spawns[spawn].spawnCreep([WORK,CARRY,MOVE], newName,
                    {memory: {role: 'harvester'}});
            } else if(builders.length < maxBuilder){
                Memory.nbrCreep++
                // TODO: Change Spawn1 to generic name
                Game.spawns[spawn].spawnCreep([WORK,CARRY,MOVE], newName,
                    {memory: {role: 'builder'}});
            } else if(upgraders.length < maxUpgrader){
                Memory.nbrCreep++
                // TODO: Change Spawn1 to generic name
                Game.spawns[spawn].spawnCreep([WORK,CARRY,MOVE], newName,
                    {memory: {role: 'upgrader'}});
            }
        }

    },

    buildNewStructure: function(){

        const maxContainer = 5;

        // Retrieve structures
        var containers = _.filter(Game.structures, (struct) => struct.structureType == STRUCTURE_CONTAINER)
                + _.filter(Game.constructionSites,  (struct) => struct.structureType == STRUCTURE_CONTAINER);

        if(containers.length < maxContainer){
            var i = 0;
            for(i = -2; i <= 2; i++){
                Game.rooms[Game.spawns['Spawn1'].room.name].createConstructionSite(Game.spawns['Spawn1'].pos.x-1, Game.spawns['Spawn1'].pos.y+i, STRUCTURE_CONTAINER);
            }
        }
    },

    init: function() {

        Memory.initialize = true;

        // Initialize Memory
        Memory.nbrCreep = 0;

        // Initialize place for creeps to rest
        Game.rooms[Game.spawns['Spawn1'].room.name].createFlag(Game.spawns['Spawn1'].pos.x, Game.spawns['Spawn1'].pos.y-10, 'Rest');
    }
};


module.exports = utils;
