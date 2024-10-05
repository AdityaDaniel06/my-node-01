const dotenv = require('dotenv');
const app = require('./app');
// console.log(app.get('env')); ---- development-- by default express
//console.log(process.env)

// NODE_ENV --speical varible to set environment
dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
