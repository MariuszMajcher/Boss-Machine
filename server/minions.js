const express = require('express')
const minionsRouter = express.Router()
const { getAllFromDatabase, 
        addToDatabase,
        getFromDatabaseById,
        updateInstanceInDatabase,
        deleteFromDatabasebyId
        } = require('./db')


minionsRouter.use((req, res, next) => {
    req.allMinions = getAllFromDatabase('minions')
    next()
})

minionsRouter.param('minionId', (req, res, next, id) => {

    const minion = getFromDatabaseById('minions', id)
    if(minion) {
        req.minionId = id
        req.minion = minion
        
        next()
    } else {
        res.status(404).send('Not in database!')
    
}
   
        
    
})       



minionsRouter.get('/', (req, res, next) => {
    res.send(req.allMinions)
})

minionsRouter.post('/', (req, res, next) => {
    const { name, title, salary, weaknesses } = req.body
    
    if(!name ){
        res.status(404).send('Minion incomplete!')
    } else {
        
        addToDatabase('minions', req.body)
        res.status(201).send(req.body)    
    }
})

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(getFromDatabaseById('minions', req.minionId))
})

minionsRouter.put('/:minionId', (req, res, next) => {
    
    const updated = updateInstanceInDatabase('minions', req.body)
    
    res.send(updated)
})

minionsRouter.delete('/:minionId', (req, res, next) => {
    
    deleteFromDatabasebyId('minions', req.minionId)
    
    res.status(204).send()
})





module.exports = minionsRouter