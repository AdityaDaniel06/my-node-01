/* eslint-disable node/no-unsupported-features/es-syntax */
// const Tour = require('../models/tourModel');
const tourModel = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  // http://localhost:4000/api//v1/tours
  // http://localhost:4000/api//v1/tours/duration[gte]=5&difficulty=easy&price[lt]=1500

  // cl(req.query) === {difficulty: 'easy', duration: {gte: '5}}
  // mongoDB query === {difficulty: 'easy', duration: {$gte: '5}}
  try {
    // BUILD query params
    const queryObj = { ...req.query }; // making a shallow copy
    //1) removing reserved words: filtering
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(field => delete queryObj[field]);

    // 2)ADVANCE FILTERIING : line 7,8
    const queryStr = JSON.stringify(queryObj);
    // REGULAR EXPRESSION: b=match exact keywords| g=match multiple keywords
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    let query = tourModel.find(queryStr);
    // 3) SORTING   http://localhost:4000/api/v1/tours/sort=price,ratingsAverage
    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }

    // to get all tour ,find()
    const tours = await query; // EXECUTE query

    //SEND response
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await tourModel.findById(req.parmas.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'Tour not found!'
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await tourModel.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      status: 'fail',
      message: 'Unable to create the tour'
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await tourModel.findByIdAndUpdate(req.parmas.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour: tour
      }
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Data sent!'
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await tourModel.findByIdAndDelete(req.parmas.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Data sent!'
    });
  }
};

// aggregation pipeline ////////
exports.getTourStats = async (req, res) => {
  try {
    const stats = await tourModel.aggregate([
      { $match: { ratingAverage: { $gte: 4.5 } } },
      {
        $group: {
          // _id: '$difficulty',
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          avgRating: { $avg: '$ratingAverage' },
          numRating: { $sum: '$ratingQuantity' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
          // numUsers: { $sum: { $size: '$users' } },
        }
      },
      {
        $sort: { avgPrice: 1 }
      }
    ]);

    res.status(204).json({
      status: 'success',
      data: stats
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Data sent!'
    });
  }
};

exports.getMonthyPlan = async (req, res) => {
  try {
    const year = req.parmas.year * 1;

    const plan = await tourModel.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTours: { $sum: 1 },
          tours: { $push: '$name' }
        }
      },
      {
        $addFields: { month: '$_id' }
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: { numTours: -1 }
      },
      {
        $limit: 12
      }
    ]);

    res.status(204).json({
      status: 'success',
      data: plan
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Data sent!'
    });
  }
};
