const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(con => {
  // console.log(con.connections);
  console.log('Connected to MongoDB');
});

//Read json file
const tours = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8');
//import data into db from json file

const importData = async () => {
  try {
    await Tour.create(JSON.parse(tours));
    console.log('Data imported successfully');
  } catch (e) {}
  process.exit();
};

// delete old data from collection
const deleteOldData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted successfully');
  } catch (e) {}
  process.exit();
};

console.log(process.argv);

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteOldData();
}
