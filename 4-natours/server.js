const app = require('./starter/dev-data/app');
const dotenv = require('dotenv');

dotenv.config({ path: './starter/config/config.env' });

const port = 3000;
console.log(app.get('env'));
console.log(process.env);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// So now the request-response path will be as follow:
// Request sent to serve
//      -> server.js
//           -> app.js (res and req object go through all the middlewares)
//                -> routes (depends on the path, handled by respective router - userRoutes/tourRoutes)
//                     -> controllers (depend on which HTTP method, handled by respective controllers - userControllers/tourControllers)
//                          -> END of the request-response flow