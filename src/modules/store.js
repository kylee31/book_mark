// store.js
// Redux 스토어 설정 파일

import { applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

// 스토어 생성
const store = configureStore({
    reducer: rootReducer
},
    applyMiddleware(thunk)
);

export default store;