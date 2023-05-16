
import Image from 'next/image';
import logolink from "../../assets/voleeyo-logo.png"
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
const Header = ({  activeTab, setActiveTab }) => {
    const { user, error, isLoading } = useUser();
    const link1 = {  name: "Login", setActiveTab: setActiveTab };
    const link2 = {  name: "Dashboard", setActiveTab: setActiveTab };
    const link3 = {  name: "Account" , setActiveTab: setActiveTab };
    const link4 = {  name: "Privacy" , setActiveTab: setActiveTab };
    const link5 = { link: "mailto:silsfinest@vodafone.it?subject=[Voleeyo] Contact request", name: "Contact" };
    const link6 = {  name: "About" , setActiveTab: setActiveTab };
    
   
    return (
        <header className="header">
            <div className="logo">
                <a href="/">
                    <Image alt="logo icon" src={logolink?.src} width={67} height={30} />
                </a>
            </div>
            <div className="nav">
                <ul>
                    {
                        !(user??true) &&
                        <li>
                            <a onClick={()=>{location.href="/api/auth/login"} } >{link1.name}</a>
                        </li>
                    }
                    {
                         (user??false) &&
                        <li>
                            <a  onClick={()=>{
                                location.href="/api/auth/logout"
                            }} >Logout</a>
                        </li> 
                    }
                    { (user??false) && <li>
                            <a onClick={() => { setActiveTab("dashboard") }}>{link2.name}</a>
                    </li>
                    }
                     { (user??false) &&  <li>
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
