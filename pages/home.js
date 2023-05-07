import Image from 'next/image';
import { useState, useEffect } from 'react';
import imageLink from '../assets//00000-3174216882.png'
const Home = ({activeTab,setActiveTab}) => {
  useEffect(()=>{
    setActiveTab("index")
  })
  return (
    <div className="dashboard-container">
      <div className="section-one">
        <div className="section-one-text">
          <h1>Voleeyo: your LinkedIn for volunteers</h1>
          <b>A place where to connect while giving back to the community</b>
          <p>
            Voleeyo is a platform where volunteers connect to improve skills, make friends, and find job opportunities.<br />
            Join a community of like-minded individuals, work on impactful initiatives, and showcase your skills. <br />
            Make a difference today with Voleeyo.
          </p>
          <div className="social-links">
            <a href="https://www.instagram.com/voleeyo/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://twitter.com/Voleeyo" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
        <div className="section-one-action">
          <button onClick={() => { location.href="/dashboard"; }}>Discover Voleeyo</button>
          <button onClick={() => { location.href="/dashboard"; }}>Join Voleeyo</button>
        </div>
      </div>
      <div className="section-two">
        <div className="section-two-image">
          <img  src={imageLink?.src}  width={512} height={512} alt="picture of friends" />
        </div>
      </div>
    </div>
  );
};

export default Home;