import Head from 'next/head';
import Image from 'next/image';
import imageLink from "./../assets/00000-3174216882.png"
import { useState, useEffect } from 'react';

const Login = ({ hideNav, setHideNav, activeTab, setActiveTab, secretCode, setSecretCode }) => {
    useEffect(() => {
        console.log("hideNav",hideNav)
        if (!hideNav) {
            var navbar = document.getElementById("navbar");
            navbar.style.display = "none";
        }
        //still won get you far if you save it manually in local storage
        const testCode = localStorage.getItem("voleeyo_login");
        // if (testCode!=undefined)
        //     location.href = '/';
    }, [hideNav]);
    const handleSecretCodeSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/checkSecret', {
                method: 'POST',
                body: JSON.stringify({ secretCode }),
            });
            const { status } = await response.json();
            if (status) {
                localStorage.setItem('voleeyo_login', secretCode);
                setActiveTab("dashboard")
            } else alert('Incorrect secret code, please try again.');
        } catch (error) {
            console.error(error);
            alert('An error occurred, please try again later.');
        }
    };
    const setCurrentSecretCode = (code) => {
        setSecretCode(code)
    }
    return (

        <div className="section-one login">
            <div className="section-one-text">
                <h2>Get in touch with <a className='sydney-color' href="https://twitter.com/sydney_lukee">Sydney</a> on twitter or send him an
                    <a className='sydney-color' href="mailto:silsfinest@vodafone.it?subject=[Voleeyo] Request access token &body= Hi,{add name} I'd like to request access to Voleeyo."> email</a> to access Voleeyo</h2>

                <form onSubmit={handleSecretCodeSubmit}>
                    <label>
                        <span>
                            Enter the secret code to log in:
                        </span>
                        <input type="password" onChange={(e) => { setCurrentSecretCode(e.target.value) }} />
                    </label>
                    <div className="btn-spacer login">
                        <button type="submit" className="login">Log in</button>
                        <button type="submit" className="close" onClick={(e) => { e.preventDefault(); location.href = "/" }}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
