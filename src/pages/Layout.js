import "../assets/styles/layout.css";
import Search from '../components/search';
import React from 'react';
import Footer from "../components/footer";

const Layout = ({ children }) => {
    return (
        <>
            <main>{children}</main>
            <Footer />
        </>
    )
};

export default Layout;