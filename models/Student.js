const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: [true, 'Student ID is required'], unique: true, trim: true, uppercase: true },
    name:      { type: String, required: [true, 'Name is required'], trim: true, maxlength: 100 },
    email:     { type: String, required: [true, 'Email is required'], trim: true, lowercase: true,
                 match: [/^\S+@\S+\.\S+$/, 'Invalid email address'] },
    department:{ type: String, required: [true, 'Department is required'], trim: true },
    semester:  { type: Number, required: [true, 'Semester is required'], min: [1, 'Semester must be 1-8'], max: [8, 'Semester must be 1-8'] },
    contact:   { type: String, trim: true, match: [/^\d{10}$/, 'Contact must be 10 digits'] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema, 'students');
