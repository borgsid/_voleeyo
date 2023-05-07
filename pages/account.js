import { useState, useEffect } from 'react';
const Account =({ activeTab, setActiveTab})=>{
    useEffect(()=>{
        var navbar = document.getElementById("navbar");
        navbar.style.display = "unset";
        setActiveTab("account")
    });
    return (
        <h4>Account page coming soon, youll be able to manage what other see of your account</h4>
    );
}
export default Account