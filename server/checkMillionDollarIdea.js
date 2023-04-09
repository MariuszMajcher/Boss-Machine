
const checkMillionDollarIdea = (req, res, next) => {
    const {name, description, weeklyRevenue, numWeeks } = req.body
    const weekly = Number(weeklyRevenue)
    const weeks = Number(numWeeks)
    const total = weekly * weeks
    
    if (!weekly || !weeks) {
      res.status(400).send('Not good string')
      return 
    } else if ( !weeklyRevenue || !numWeeks) {
      res.status(400).send('Fill all the inputs.')
      return 
    } else if (total < 1000000) {
      res.status(400).send('Insufficiently good')
      return 
    }
    
    return next()
  }
  
  module.exports = checkMillionDollarIdea;
  
  
  
  
  
  
  

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
