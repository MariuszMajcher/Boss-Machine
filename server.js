const express = require('express');
const app = express();
const minionsRouter = require('./server/minions')
const ideasRouter = require('./server/ideas')
const meetingsRouter = require('./server/meetings')

module.exports = app;

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
const cors = require('cors')
app.use(cors())

// Add middware for parsing request bodies here:
const bodyParser = require('body-parser')
app.use(bodyParser.json())


// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');

app.use('/api', apiRouter)

// Setting up Routers for the endpoints
apiRouter.use('/minions', minionsRouter)
apiRouter.use('/ideas', ideasRouter)
apiRouter.use('/meetings', meetingsRouter)

// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
}
