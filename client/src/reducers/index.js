import { combineReducers } from 'redux';
import assets from './asset';
import tab_asset_parent from './tab_asset_parent';
import audits from './audit';

export default combineReducers({
  assets,
  audits,
  tab_asset_parent,
});
