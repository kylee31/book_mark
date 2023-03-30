import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLogin } from './isLogin';

const PrivateRoute = ({ children }) => {
    if (!isLogin()) {
        return <Navigate to="/" />
    }
    return children
};

export default PrivateRoute;