const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hr_employee_alternate_contact = new Schema({
  alternate_contact_id: Number,
  emp_id: String,
  phone_number: String,
  contact_person: String,
  type: String,
  notif_date: Date,
  created_at: Date,
  updated_at: Date
});

module.exports = mongoose.model(
  'hr_employee_alternate_contact',
  hr_employee_alternate_contact,
  'hr_employee_alternate_contact'
);
