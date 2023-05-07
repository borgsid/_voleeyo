
import Image from 'next/image';
import logolink from "../../assets/voleeyo-logo.png"
import { useState, useEffect } from 'react';

const Header = ({ isVisible, activeTab, setActiveTab }) => {

    const link1 = { link: "/login", name: "Login" };
    const link2 = { link: "/dashboard", name: "Dashboard", setActiveTab: setActiveTab };
    const link3 = { link: "/account", name: "Account" , setActiveTab: setActiveTab };
    const link4 = { link: "/privacy", name: "Privacy" , setActiveTab: setActiveTab };
    const link5 = { link: "mailto:silsfinest@vodafone.it?subject=[Voleeyo] Contact request", name: "Contact" };
    const link6 = { link: "/about", name: "About" , setActiveTab: setActiveTab };
    const handleMyAccountClick = () => {
        const loginCode = localStorage.getItem('voleeyo_login');
        if (!loginCode)
            location.href = "/login"
        else
            window.location.href = '/dashboard';
    };


    const CheckLogAndGoToFriends = () => {
        const loginCode = localStorage.getItem('voleeyo_login');
        if (!loginCode)
            location.href = "/login"
        else
            window.location.href = '/friends';

    }
    const handleLogout = () => {
        localStorage.removeItem("voleeyo_login");
        setActiveTab(null)
    };

    return (
        <header className="header">
            <div className="logo">
                <a href="/">
                    <Image alt="logo icon" src={logolink.src} width={67} height={30} />
                </a>
            </div>
            <div className="nav">
                <ul>
                    {
                        isVisible &&
                        <li>
                            <a href="#" onClick={handleMyAccountClick}>{link1.name}</a>
                        </li>
                    }
                    {
                        !isVisible &&
                        <li>
                            <a href="" onClick={handleLogout} >Logout</a>
                        </li>
                    }
                    {!isVisible && <li>
                            <a onClick={() => { setActiveTab("dashboard") }}>{link2.name}</a>
                    </li>
                    }
                     {!isVisible &&  <li>
                        <a onClick={() => { setActiveTab("account") }}>{link3.name}</a>
                    </li>
                    }
                    <li>
                        <a onClick={() => { setActiveTab("privacy") }}>{link4.name}</a>
                    </li>
                    <li>
                        <a href={link5.link}>{link5.name}</a>
                    </li>
                    <li>
                        <a onClick={() => { setActiveTab("about") }}>{link6.name}</a>
                    </li>
                </ul>
            </div>
        </header>
    );
};
export default Header;
