export default function (state = null, action) {
  switch (action.type) {
    case 'AUDIT_NEW':
      return { ...state, newAudit: action.payload } || false;
    case 'AUDIT_GET_EXISTING':
      return { ...state, existAudit: action.payload } || false;
    case 'AUDIT_RECONCILE_MOVE':
      return { ...state, reconcileAudit: action.payload } || false;
    case 'AUDIT_RECONCILE_DISPOSE':
      return { ...state, reconcileAudit: action.payload } || false;
    case 'AUDIT_RECONCILE_MAINTENANCE':
      return { ...state, reconcileAudit: action.payload } || false;
    case 'AUDIT_RECONCILE_OTHER':
      return { ...state, reconcileAudit: action.payload } || false;
    case 'AUDIT_FINISH':
      return { ...state, auditFinish: action.payload } || false;
    default:
      return state;
  }
}
