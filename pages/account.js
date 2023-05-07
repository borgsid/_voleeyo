import { useState, useEffect } from 'react';
const Account =({ activeTab, setActiveTab})=>{
    useEffect(()=>{
        setActiveTab("account")
    });
    return (
        <h4>Account page coming soon, youll be able to manage what other see of your account</h4>
    );
}
export default Account