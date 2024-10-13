const tourModel = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    // to get all tour ,find()
    const tours = await tourModel.find();
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
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid Data sent!'
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await tourModel.findByIdAndUpdate(req.parmas.id, req.body, {
      new: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated tour here...>'
      }
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Data sent!'
    });
  }
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
