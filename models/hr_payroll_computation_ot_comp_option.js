const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hr_payroll_computation_ot_comp_option = new Schema({
  ot_comp_option_id: String,
  basic_salary: String,
  deminimis: String,
  allowance: String,
  reimbursable_allowance: String,
  ecola: String,
  notif_date: Date,
  created_at: Date,
  updated_at: Date
});
hr_payroll_computation_ot_comp_option.pre('save', function(next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});
module.exports = mongoose.model(
  'hr_payroll_computation_ot_comp_option',
  hr_payroll_computation_ot_comp_option,
  'hr_payroll_computation_ot_comp_option'
);
