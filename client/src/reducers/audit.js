export default function (state = null, action) {
  switch (action.type) {
    case 'AUDIT_NEW':
      return { ...state, newAudit: action.payload } || false;
    case 'AUDIT_GET_EXISTING':
      return { ...state, existAudit: action.payload } || false;
    default:
      return state;
  }
}
