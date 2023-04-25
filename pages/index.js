import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [secretCode, setSecretCode] = useState("");

  const handlePopupClose = () => {
    setShowPopup(false);
  };
  const handleMyAccountClick = () => {
    const loginCode = localStorage.getItem("voleeyo_login");
    if (!loginCode) {
      setShowPopup(true);
    } else {
      window.location.href = "/dashboard";
    }
  };


    const handleSecretCodeSubmit = async () => {
      try {
        const response = await fetch("/api/checkSecret", {
          method: "POST",
          body: JSON.stringify({ secretCode }),
        });
        const { status } = await response.json();
        if (status) {
          localStorage.setItem("voleeyo_login", secretCode);
          window.location.href = "/dashboard";
        } else {
          alert("Incorrect secret code, please try again.");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred, please try again later.");
      }
    };

  return (
    <div className="root">
      <Head>
        <title>Voleeyo: create your path!</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="headerTitle">
            <h1>Welcome to Voleeyo</h1>
          </div>
          <div className="headerSubtitle">
            <h2>Hi there volunteer, what's on the agenda today?</h2>
          </div>
        </div> 
        <div className="cardContainer">
          <div className="card" onClick={() => handleMyAccountClick()}>
            <label>
              <h3>My account</h3>
            </label>
          </div>
          <div className="card">
            <label>
              <h3>My friends</h3>
            </label>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <form onSubmit={(e) => { e.preventDefault(); handleSecretCodeSubmit(); }}>
            <label>
              Enter the secret code to log in:
              <input
                type="password"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
              />
            </label>
            <div className="btn-spacer">
              <button type="submit">Log in</button>
              <button type="submit" className='close' onClick={handlePopupClose}>Close</button>
            </div>
          </form>
        </div>
      )}
      <div className="badge-container grow">
        <a
          href="#"
          // target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};


export default Home;
