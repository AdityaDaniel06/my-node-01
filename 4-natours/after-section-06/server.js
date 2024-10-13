const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
// console.log(app.get('env')); ---- development-- by default express
//console.log(process.env)
// NODE_ENV --special varible to set environment
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(con => {
  // console.log(con.connections);
  console.log('Connected to MongoDB');
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
