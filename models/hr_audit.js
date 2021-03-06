const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hr_audit = new Schema({
  audit_window_name: String,
  audit_asset: { type: Schema.Types.ObjectId, ref: 'hr_assets' },
  audit_date: String,
  audit_location: String,
  audit_site: String,
  audit_note: String,
  audit_check: Boolean,
  audit_action_date: String,
  audit_action: String,
  audit_move_employee: String,
  audit_move_department: String,
  audit_action_note: String,
  audit_action_reason: String,
  audit_status: Boolean,
  maintenanceduedate: String,
  auditor: String,
  transaction: String,
  requestor: String,
  audit_approval: String,
  audit_ticket_no: String,
  audit_finish: String,
  notif_date: Date,
  created_at: Date,
  updated_at: Date,
});

hr_audit.pre('save', function (next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});
module.exports = mongoose.model('hr_audit', hr_audit, 'hr_audit');
