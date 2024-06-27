const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
// middleware
//3rd party logging middleware Morgan
app.use(morgan('dev'));
app.use(express.json());

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
//reading data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours-simple.json`)
);

//Route handlers
const getAllTours = (req, res) => {
  console.log(requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

//getting one tour based on ID
const getOneTour = function (req, res) {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  // params = contains all the varibles that we define in URL
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTours = function (req, res) {
  // console.log(req.body);
  //creating new id manually as no DB
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

// update: Put and patch
const updateTours = function (req, res) {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    tour: '<Updated tours here...>',
  });
};

//delete
const deleteTours = (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

//getting al the tours
// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTours);
// app.get('/api/v1/tours/:id', getOneTour);
// app.patch('/api/v2/tours/:id', updateTours);
// app.delete('/api/v1/tours/:id', deleteTours);

app.route('/api/v1/tours').get(getAllTours).post(createTours);
app
  .route('/api/v1/tours/:id')
  .get(getOneTour)
  .patch(updateTours)
  .delete(deleteTours);
const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
