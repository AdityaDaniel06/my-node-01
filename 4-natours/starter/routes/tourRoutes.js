const express = require('express');
const tourController = require('../controllers/tourController');
const router = express.Router();

router.param('id',tourController.checkId);

// create bodyCheck middleware

//tour routes
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.bodyCheck , tourController.createTours);

router
  .route('/:id')
  .get(tourController.getOneTour)
  .patch(tourController.updateTours)
  .delete(tourController.deleteTours);

module.exports = router;
