import { useState, useEffect } from 'react';
const About =({ activeTab, setActiveTab})=>{
    useEffect(()=>{
        setActiveTab("about")
    })
    return (
        <h4>About page coming soon, I'll tell you mor about me and how I came up with the Voleeyo project and name.</h4>
    );
}
export default About;