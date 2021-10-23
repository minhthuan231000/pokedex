import { combineReducers } from 'redux';
import addlistReducer from './AddList/addlist.reducer';

const rootReducer = combineReducers({
    addlist: addlistReducer,
});

export default rootReducer;