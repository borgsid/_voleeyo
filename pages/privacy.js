import { useState, useEffect } from 'react';

const Privacy =({ activeTab, setActiveTab})=>{
    useEffect(()=>{
        setActiveTab("privacy")
    })
    return (
        <h4>Privacy page coming soon, standard stuff for me to disclose as a EU citizen under the GDPR regulation when managing user data.</h4>
    );
}
export default Privacy;