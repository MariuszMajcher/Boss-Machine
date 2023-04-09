const express = require('express')
const { 
    createMeeting,
    getAllFromDatabase, 
    addToDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase
    } = require('./db')

const meetingsRouter = express.Router()

meetingsRouter.use('/', (req, res, next) => {
    req.allMeetings = getAllFromDatabase('meetings')
    next()
})


meetingsRouter.get('/',(req, res, next) => {
    res.send(req.allMeetings)
})

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = createMeeting()
    addToDatabase('meetings', newMeeting)
    res.status(201).send(newMeeting)
})

meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings')
    res.status(204).send()
})

module.exports = meetingsRouter