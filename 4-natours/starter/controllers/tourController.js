
const fs = require('fs');

//reading data
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );

  exports.checkId = (req , res, next , val) =>{
    console.log(`tour ID: ${val}`);
    if (req.params.id > tours.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }
    next();
  }

exports.bodyCheck = (req, res, next, val) => {
  if (!req.body.name ||!req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
}
//Route handlers
exports.getAllTours = (req, res) => {
  // console.log(requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

//getting one tour based on ID
exports.getOneTour = function (req, res) {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  // params = contains all the varibles that we define in URL
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTours = function (req, res) {
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
exports.updateTours = function (req, res) {
  
  res.status(200).json({
    status: 'success',
    tour: '<Updated tours here...>',
  });
};

//delete
exports.deleteTours = (req, res) => {
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