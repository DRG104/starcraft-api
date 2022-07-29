const express = require('express')
const passport = require('passport')

// pull in Mongoose model for pets
const Unit = require('../models/unit')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// ROUTES GO HERE
// we only need three, and we want to set them up using the same conventions as our other routes, which means we might need to refer to those other files to make sure we're using our middleware correctly

// POST -> create a stat
// POST /stats/<pet_id>
router.post('/stats/:unitId', removeBlanks, (req, res, next) => {
    // get our stat from req.body
    const stat = req.body.stat
    // get our unit's id from req.params.unitId
    const unitId = req.params.unitId
    // find the unit
    Unit.findById(unitId)
        .then(handle404)
        .then(unit => {
            console.log('this is the unit', unit)
            console.log('this is the stat', stat)

            // pusht he stat into the unit's stats arry
            unit.stats.push(stat)

            // save the unit
            return unit.save()

        })
        // send the newly updated unit as json
        .then(unit => res.status(201).json({ unit: unit }))
        .catch(next)
})

// UPDATE a stat
// PATCH /stats/<unit_id>/<stat_id>
router.patch('/stats/:unitId/:statId', requireToken, removeBlanks, (req, res, next) => {
    // get the stat and the unit IDs saved to variables
    const unitId = req.params.unitId
    const statId = req.params.statId

    // find our unit
    Unit.findById(unitId)
        .then(handle404)
        .then(unit => {
            // vvv these are subdocument methods vvv
            // single out the stat (.id is a subdoc method to find something in an array of subdocs)
            const theToy = unit.stats.id(statId)
            // make sure the user sending the request is the owner
            requireOwnership(req, unit)
            // update the stat with a subdocument method
            theToy.set(req.body.stat)
            // return the saved unit
            return unit.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE a to y
// DELETE /stats/<unit_id>/<stat_id>
router.delete('/stats/:unitId/:statId', requireToken, (req, res, next) => {
    // get the stat and the unit ids saved to variables
    const unitId = req.params.unitId
    const statId = req.params.statId
    // then we find the unit
    Unit.findById(unitId)
        // handle a 404
        .then(handle404)
        // do stuff with the stat (in this case, delete it)
        .then(unit => {
            // we can get the subdoc the same way as update
            const theToy = unit.stats.id(statId)
            // require that the user deleting the stat is the unit's owner
            requireOwnership(req, unit)
            // call remove on the subdoc
            theToy.remove()

            // return the saved unit
            return unit.save()
        })
        // send 204 no content status
        .then(() => res.sendStatus(204))
        // handle errors
        .catch(next)
})

// export the router
module.exports = router