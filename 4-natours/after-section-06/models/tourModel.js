const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
  },
  rating: { type: Number, default: 4.5 },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty']
  }
});
const Tour = mongoose.model('Tour', tourSchema);
// const testTour = new Tour({
//   name: 'The Snow Adventurer',
//   rating: 4.2,
//   price: 999
// });
// testTour
//   .save()
//   .then(doc => console.log(doc))
//   .catch(err => console.log(err));

module.exports = Tour;
