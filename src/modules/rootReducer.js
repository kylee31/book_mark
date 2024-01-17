// rootReducer.js
// 루트 리듀서 파일

import { combineReducers } from 'redux';
import uidReducer from './uidDuck';
import cateReducer from './cateDuck';

// 루트 리듀서 정의
const rootReducer = combineReducers({
    cate: cateReducer,
    uid: uidReducer
    // 다른 리듀서가 있다면 추가 가능
});

export default rootReducer;