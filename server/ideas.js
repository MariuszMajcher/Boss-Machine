const express = require('express')
const { getAllFromDatabase, 
    addToDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
    } = require('./db')

const ideasRouter = express.Router()

const checkMillionDollarIdea = require('./checkMillionDollarIdea')



ideasRouter.use((req, res, next) => {
    req.allIdeas = getAllFromDatabase('ideas')
    next()
})

ideasRouter.param('ideaId', (req, res, next, ideaId) => {
    const idea = getFromDatabaseById('ideas', ideaId)
    if(!idea) {
        res.status(404).send('Not in database')
    } 
    
    req.idea = idea
    req.ideaId = ideaId
    console.log(req.idea)
    next()
    
})

ideasRouter.use((req, res, next) => {
    if(req.method === 'POST') {
        checkMillionDollarIdea(req, res, next)
        
        } else {
            next()
        }
    
})
ideasRouter.get('/', (req, res, next) => {
    res.status(200).send(req.allIdeas)
})

ideasRouter.get('/:ideaId', (req, res, next) => {
    const idea = getFromDatabaseById('ideas', req.params.ideaId)
    res.send(idea)
    next()
})

ideasRouter.post('/', (req, res, next) => {
    addToDatabase('ideas', req.body)
    res.status(201).send(req.body)
})

ideasRouter.put('/:ideaId', (req, res, next) => {
    
   const updated =  updateInstanceInDatabase('ideas', req.body)
   res.send(updated)
})

ideasRouter.delete('/:ideaId', (req, res, next) => {
    deleteFromDatabasebyId('ideas', req.ideaId)
    res.status(204).send(req.idea)
    
})

module.exports = ideasRouter