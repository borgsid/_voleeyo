import logolink from "../../assets/voleeyo-logo.png"
import { useState, useEffect } from 'react';

const Header = (isVisible) => {

    var isLoginVisible = isVisible.isVisible;
    console.log("isLoginVisible",isLoginVisible)
    const link1 = { link: "/login", name: "Login" };
    const link2 = { link: "/dashboard", name: "Dashboard" };
    const link3 = { link: "/account", name: "Account" };
    const link4 = { link: "/privacy", name: "Privacy" };
    const link5 = { link: "/contacct", name: "Contact" };
    const link6 = { link: "/about", name: "About" };
    const handleMyAccountClick = () => {
        const loginCode = localStorage.getItem('voleeyo_login');
        if (!loginCode) 
            location.href="/login"
        else window.location.href = '/dashboard';
    };

    
    const CheckLogAndGoToFriends = () => {
        const loginCode = localStorage.getItem('voleeyo_login');
        if (!loginCode) 
            location.href="/login"
        else 
            window.location.href = '/friends';

    }
    const handleLogout = () => {
        localStorage.removeItem("voleeyo_login");
        location.href = "/";
    };

    return (
        <header className="header">
            <div className="logo">
                <a href="/">
                    <img src={logolink.src} />
                </a>
            </div>
            <div className="nav">
                <ul>
                    {
                        isLoginVisible&&
                        <li>
                            <a onClick={handleMyAccountClick}>{link1.name}</a>
                        </li>
                    }
                    <li>
                        <a href={link2.link}>{link2.name}</a>
                    </li>
                    <li>
                        <a href={link3.link}>{link3.name}</a>
                    </li>
                    <li>
                        <a href={link4.link}>{link4.name}</a>
                    </li>
                    <li>
                        <a href={link5.link}>{link5.name}</a>
                    </li>
                    <li>
                        <a href={link6.link}>{link6.name}</a>
                    </li>
                </ul>
            </div>
        </header>
    );
};
export default Header;
