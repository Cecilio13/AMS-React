const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hr_employee_attendance = new Schema({
  employee_attendance_id: Number,
  emp_id: String,
  attendance_date: String,
  attendance_time_in: String,
  attendance_time_out: String,
  attendance_type: String,
  attendance_status: String,
  notif_date: Date,
  created_at: Date,
  updated_at: Date
});

module.exports = mongoose.model(
  'hr_employee_attendance',
  hr_employee_attendance
);
