import Head from 'next/head';
import Image from 'next/image';
import imageLink from "./../assets/00000-3174216882.png"
import { useState, useEffect } from 'react';

const Home = () => {
  return (
      <div className="dashboard-container">
        <Head>
          <title>Voleeyo: create your path!</title>
        </Head>
       
        <div className="section-one">
          <div className="section-one-text">
            <h1>Voleeyo: your LinkedIn for volunteers</h1>
            <b>A place where to connect while giving back to the community</b>
            <p>Voleeyo is a platform where volunteers connect to improve skills, make friends, and find job opportunities.<br/>
            Join a community of like-minded individuals, work on impactful initiatives, and showcase your skills. <br/>
            Make a difference today with Voleeyo.
            </p>
            <div className="social-links">
              <a href="https://www.instagram.com/voleeyo/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://twitter.com/Voleeyo" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
          </div>
          <div className="section-one-action">
            <button onClick={()=>{location.href="/dashboard"}}>Discover Voleeyo</button>
            <button onClick={()=>{location.href="/login"}}>Join Voleeyo</button>
          </div>
        </div>

        <div className="section-two">
          <div className="section-two-image">
            <img src={imageLink.src}/>
          </div>
        </div>
      
        {/* <div className="card" onClick={handleMyAccountClick}>
              <label><h3>My account</h3></label>
            </div>
            <div className="card" onClick={CheckLogAndGoToFriends}>
              <label><h3>My friends</h3></label>
            </div>
        */}
        
      </div>
  );
};

export default Home;
