const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTours);
// app.get('/api/v1/tours/:id', getOneTour);
// app.patch('/api/v2/tours/:id', updateTours);
// app.delete('/api/v1/tours/:id', deleteTours);

//user routes
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUsers);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
