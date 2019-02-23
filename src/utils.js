var utils = {

    spawnNewCreeps: function() {

        const maxHarvester = 2;
        const maxBuiler = 1;
        const maxUpgrader = 1;

        // Delete memory of dead creeps
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }

        // Retrieve creeps number for each role
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');


        // Spawns creep (the order is important)
        var newName = 'Creep' + Memory.nbrCreep;
        if(harvesters.length < maxHarvester) {
            Memory.nbrCreep++
            // TODO: Change Spawn1 to generic name
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: 'harvester'}});
        } else if(builders.length < maxBuiler){
            Memory.nbrCreep++
            // TODO: Change Spawn1 to generic name
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: 'builder'}});
        } else if(upgraders.length < maxUpgrader){
            Memory.nbrCreep++
            // TODO: Change Spawn1 to generic name
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: 'builder'}});
        }

        // Display spawning
        if(Game.spawns['Spawn1'].spawning) {
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️',
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }

    },

    init: function() {

        Memory.initialize = true;

        // Initialize Memory
        Memory.nbrCreep = 0;
    }
};


module.exports = utils;
