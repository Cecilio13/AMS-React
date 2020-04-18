import axios from 'axios';

// ================= REDUCER_NAME (REDUCER_FILENAME) ==================

// ================= ASSET (hr_asset.js) ==================
export const newAsset = (data) => async (dispatch) => {
  const asset = await axios.post('/api/assets', data);
  dispatch({ type: 'NEW_ASSET_ADDED', payload: asset.data });
};

export const getAssets = () => async (dispatch) => {
  const asset = await axios.get('/api/assets');
  dispatch({ type: 'ASSET_FETCHED', payload: asset.data });
};

export const editAsset = (data) => async (dispatch) => {
  dispatch({ type: 'ASSET_EDIT', payload: data });
};

export const updateAsset = (id, data) => async (dispatch) => {
  const asset = await axios.patch('/api/assets', {
    ...data,
    _id: id,
  });
  dispatch({ type: 'ASSET_UPDATE', payload: asset.data });
};

export const checkOutAsset = (tag) => async (dispatch) => {
  const asset = await axios.patch('/api/assets/checkout', {
    tag,
  });
  dispatch({ type: 'ASSET_CHECKOUT', payload: asset.data });
};

// ================= AUDIT (hr_audit.js) ==================

export const saveAudit = (data) => async (dispatch) => {
  const audit = await axios.put('/api/audit', data);
  dispatch({ type: 'AUDIT_NEW', payload: audit.data });
};

export const getExistingAudit = (name) => async (dispatch) => {
  const audit = await axios.post('/api/audit/existing', {
    audit_window_name: name,
  });
  dispatch({ type: 'AUDIT_GET_EXISTING', payload: audit.data });
};

export const reconcileMoveAudit = (data) => async (dispatch) => {
  const audit = await axios.patch('/api/audit', data);
  console.log(audit.data);
  dispatch({ type: 'AUDIT_RECONCILE_MOVE', payload: audit.data });
};

export const reconcileDisposeAudit = (data) => async (dispatch) => {
  const audit = await axios.patch('/api/audit', data);
  console.log(audit.data);
  dispatch({ type: 'AUDIT_RECONCILE_DISPOSE', payload: audit.data });
};

export const reconcileMaintenanceAudit = (data) => async (dispatch) => {
  const audit = await axios.patch('/api/audit', data);
  console.log(audit.data);
  dispatch({ type: 'AUDIT_RECONCILE_MAINTENANCE', payload: audit.data });
};

export const reconcileOtherAudit = (data) => async (dispatch) => {
  const audit = await axios.patch('/api/audit', data);
  console.log(audit.data);
  dispatch({ type: 'AUDIT_RECONCILE_OTHER', payload: audit.data });
};

export const finishAudit = (data) => async (dispatch) => {
  const audit = await axios.post('/api/audit/finish', data);
  console.log(audit.data);
  dispatch({ type: 'AUDIT_FINISH', payload: audit.data });
};
// ================= NAVIGATOR (tab_asset_parent.js) ==================
export const gotoTab = (tab) => async (dispatch) => {
  dispatch({ type: 'GOTO_TAB', payload: tab });
};
