import Image from 'next/image';
import { useState, useEffect } from 'react';
import imageLink from '../assets//00000-3174216882.png'
import Dashboard from './dashboard';
import Notifications from './notifications'
import Friends from './friends'
import FriendsNetwork from './friendsNetwork'
import Account from './account';
import About from './about';
import Privacy from './privacy';
const index = ({activeTab,setActiveTab,isVisible,friendLookUp,setFriendLookUp}) => {
  useEffect(()=>{
    console.log("active tab",activeTab)
    setActiveTab("index")
  },[activeTab])
  return (
    <div className="index dashboard">
      {activeTab=="index"&&<div className="dashboard-container">
        <div className="section-one">
          <div className="section-one-text">
            {isVisible&&<h1>Voleeyo: your LinkedIn for volunteers</h1>}
            {!isVisible&&<h1>Welcome back to Voleeyo</h1>}
            <b>A place where to connect while giving back to the community</b>
            {
             isVisible&& <p>
              Voleeyo is a platform where volunteers connect to improve skills, make friends, and find job opportunities.<br />
              Join a community of like-minded individuals, work on impactful initiatives, and showcase your skills. <br />
              Make a difference today with Voleeyo.
            </p>
            }
            {!isVisible &&<p>Find out what you friends have been up to and connect with new ones!</p> }
            <div className="social-links">
              <a href="https://www.instagram.com/voleeyo/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://twitter.com/Voleeyo" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
          </div>
          {isVisible&&
            <div className="section-one-action">
              <button onClick={() => { location.href = "/dashboard"; }}>Discover Voleeyo</button>
              <button onClick={() => { location.href = "/dashboard"; }}>Join Voleeyo</button>
            </div>
          }
          {!isVisible&&
            <div className="section-one-action">
              <button onClick={() => { setActiveTab("dashboard") }}>Go to Daschboard</button>
            </div>
          }
          </div>
          <div className="section-two">
            <div className="section-two-image">
              <img src={imageLink?.src} width={512} height={512} alt="picture of friends" />
            </div>
          </div>
        </div>
      }
      {activeTab=="dashboard"&&<Dashboard activeTab={activeTab} setActiveTab={setActiveTab}/>}
      {activeTab=="notifications"&&<Notifications activeTab={activeTab} setActiveTab={setActiveTab} friendLookUp={friendLookUp} setFriendLookUp={setFriendLookUp}/>}
      {activeTab=="friends"&&<Friends activeTab={activeTab} setActiveTab={setActiveTab} friendLookUp={friendLookUp} setFriendLookUp={setFriendLookUp}/>}
      {activeTab=="friendsNetwork"&&<FriendsNetwork activeTab={activeTab} setActiveTab={setActiveTab} friendLookUp={friendLookUp} setFriendLookUp={setFriendLookUp}/>}
      {activeTab=="account"&&<Account activeTab={activeTab} setActiveTab={setActiveTab} />}
       {activeTab=="about"&&<About activeTab={activeTab} setActiveTab={setActiveTab} />}
       {activeTab=="privacy"&&<Privacy activeTab={activeTab} setActiveTab={setActiveTab} />}
    </div>
  );
};

export default index;