const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController')


//tour routes
router.route('/').get(tourController.getAllTours).post(tourController.createTours);

router
  .route('/:id')
  .get(tourController.getOneTour)
  .patch(tourController.updateTours)
  .delete(tourController.deleteTours);

  module.exports = router;