import Head from 'next/head';
import Image from 'next/image';
import imageLink from "./../assets/00000-3174216882.png"
import { useState, useEffect } from 'react';

const Login = () => {
    const [secretCode, setSecretCode] = useState('');
    useEffect(() => {

        var navbar = document.getElementById("navbar");
        navbar.style.display = "none";
    });
    const handleSecretCodeSubmit = async () => {
        try {
            const response = await fetch('/api/checkSecret', {
                method: 'POST',
                body: JSON.stringify({ secretCode }),
            });
            const { status } = await response.json();
            if (status) {
                localStorage.setItem('voleeyo_login', secretCode);
                window.location.href = '/dashboard';
            } else alert('Incorrect secret code, please try again.');
        } catch (error) {
            console.error(error);
            alert('An error occurred, please try again later.');
        }
    };
    return (
        <div className="dashboard-container">
            <Head>
                <title>Voleeyo: create your path!</title>
            </Head>
            <div className="section-one login">
                <div className="section-one-text">

                    <form onSubmit={(e) => { e.preventDefault(); handleSecretCodeSubmit(); }}>
                        <label>
                            Enter the secret code to log in:
                            <input type="password" value={secretCode} onChange={(e) => setSecretCode(e.target.value)} />
                        </label>
                        <div className="btn-spacer login">
                            <button type="submit">Log in</button>
                            <button type="submit" className='close' onClick={() => { location.href = "/" }}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="section-two">
            <div className="section-two-image">
            <img src={imageLink.src}/>
          </div>
            </div>

        </div>
    );
};

export default Login;
