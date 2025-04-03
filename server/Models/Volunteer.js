


const mongoose = require('mongoose');

// Define the volunteer schema
const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
    minlength: 3,
  },
  availability: {
    type: [String],  // Change from String to an array of strings
    required: true,
    enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], // Restrict the values to the days of the week
  },
  city: {
    type: String,
    required: true, // Make it required if every volunteer must have a city
  },
  status: {
    type: String,
    default: 'Active', // Could be 'Active', 'Inactive', 'Pending', etc.
  },
  notes: {
    type: String,
    required: false,
  },
});

// Create a Mongoose model for the volunteer schema
const Volunteer = mongoose.model('Volunteer', volunteerSchema);
Volunteer.createIndexes();
module.exports = Volunteer;

