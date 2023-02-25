import "../assets/styles/layout.css";
import Search from '../components/search';
import React, { useState, useEffect } from 'react';

const Layout = ({ children }) => {
    return (
        <>
            <main>{children}</main>
        </>
    )
};

export default Layout;