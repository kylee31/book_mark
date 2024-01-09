// rootReducer.js
// 루트 리듀서 파일

import { combineReducers } from 'redux';
import dataReducer from './dataDuck'; // 새로 추가된 모듈
import uidReducer from './uidDuck';

// 루트 리듀서 정의
const rootReducer = combineReducers({
    // data: dataReducer, // 새로 추가된 모듈
    uid: uidReducer
    // 다른 리듀서가 있다면 추가 가능
});

export default rootReducer;