// seed.js is going to be the file we run, whenever we want to seed our database, we'll create a bunch of pets at once.

// we want to be careful with this, because when we run it, it'll delete all of the pets in the DB.

// we can modify this later, to only delete pets that don't have an owner already, but we'll keep it simple for now.

const mongoose = require('mongoose')
const Unit = require('./unit')
const db = require('../../config/db')

const startUnits = [
    { 
        Name: 'Stalker', 
        Cost: '125 minerals 50 gas', 
        Tier: 1.5, 
        Produced:'Gateway',  
        Targets: 'Ground / Air',
        Alive: true,
        Status: 'In-combat'
    },
    { 
        Name: 'Zealot', 
        Cost: '100 minerals', 
        Tier: 1, 
        Produced:'Gateway', 
        Targets: 'Ground',
        Alive: true,
        Status: 'Idle'
    },
    { 
        Name: 'Carrier', 
        Cost: '350 minerals 250 gas', 
        Tier: 3, 
        Produced:'Stargate', 
        Targets: 'Ground / Air',
        Alive: true,
        Status: 'In-combat'
    },
    { 
        Name: 'Void Ray', 
        Cost: '250 minerals 150 gas', 
        Tier: 2, 
        Produced:'Stargate', 
        Targets: 'Ground / Air',
        Alive: true,
        Status: 'In-combat'
    },
    { 
        Name: 'Immortal', 
        Cost: '275 minerals 100 gas', 
        Tier: 2, 
        Produced:'Robotics Facility', 
        Targets: 'Ground',
        Alive: true,
        Status: 'In-combat'
    }
]

// first we need to connect to eh database
mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        // first we remove all of the units
        // here before Unit.deleteMany()
        // we can add something to make sure we only delete units without an owner
        Unit.deleteMany({ owner: null })
            .then(deletedUnits => {
                console.log('deletedUnits', deletedUnits)
                // the next step is to use our startPets array to create our seeded pets
                Unit.create(startUnits)
                    .then(newUnits => {
                        console.log('the new units', newUnits)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                conole.log(error)
                mongoose.connection.close()
            })
    })
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })