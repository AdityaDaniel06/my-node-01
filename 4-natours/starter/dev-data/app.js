const express = require('express');
const morgan = require('morgan');

const tourRouter = require('../routes/tourRoutes');
const userRouter = require('../routes/userRoutes');

const app = express();
// middleware
//3rd party logging middleware Morgan
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/../public`));

//custom middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// define routes
// app.get('/', (req, res) => {
//   // res.status(200).send('Hello from the server side.');
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side.', app: 'natours' });
// });

// app.post('/', (req, res) => {
//   res.send('Sending Post request...');
// });
// // to start a server
// const port = 3000;
// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });

// natours Project

//mounting the routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
