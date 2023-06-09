import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import Orders from '../Orders/Orders';

const Layout = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Layout;