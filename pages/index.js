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
import Profile from './profile'
import { useUser } from '@auth0/nextjs-auth0/client';
export default ({ showSideMenu, setShowSideMenu, hideNav, setHideNav, activeTab, setActiveTab, friendLookUp, setFriendLookUp }) =>{
  const { user, error, isLoading } = useUser();
  const [isTest, setIsTest] = useState(false)
  const canShowTab = () => {
    setActiveTab("dashboard");
    
    if (activeTab!=undefined)
      switch (activeTab) {
        case "dashboard":
        case "notifications":
        case "friends":
        case "friendsNetwork":
        case "profile":
          setShowSideMenu(true);
          break;
        case "index":
        case "about":
        case "privacy":
        default:
          setShowSideMenu(false);
          break;
      }
    else
      setShowSideMenu(false);
  } 
  return (
    <div className="index dashboard">
      {(activeTab == "index" || activeTab == "login") && <div className="dashboard-container">
        <div className="section-one">

          {activeTab == "index" &&
            <div className="section-one-text">
              {!(user??false) && <h1>Voleeyo: your LinkedIn for volunteers</h1>}
              {(user??false) && <h1>Welcome back to Voleeyo, {user.given_name}</h1>}
              <b>A place where to connect while giving back to the community</b>
              {
                !(user??false) && <p>
                  Voleeyo is a platform where volunteers connect to improve skills, make friends, and find job opportunities.<br />
                  Join a community of like-minded individuals, work on impactful initiatives, and showcase your skills. <br />
                  Make a difference today with Voleeyo.
                </p>
              }
              {(user??false) && <p>Find out what you friends have been up to and connect with new ones!</p>}
              <div className="social-links">
                <a href="#" target="_blank" rel="noopener noreferrer">Instagram (Coming soon)</a>
                <a href="https://twitter.com/Voleeyo" target="_blank" rel="noopener noreferrer">Twitter (WIP)</a>
              </div>
              <br />
              <br />
              <span>Like what I'm doing, here are some links</span>

              <div className="social-links">
                <a href="https://www.buymeacoffee.com/sydneylukee" target="_blank" rel="noopener noreferrer">Buy me a coffee</a>
                <a href="https://github.com/borgsid/_voleeyo" target="_blank" rel="noopener noreferrer">Github repo</a>
              </div>
            </div>
          }

          {!(user??false) &&
            <div className="section-one-action">
              <button onClick={() => {
                location.href = "/api/auth/login"
              }}>
                Discover Voleeyo
              </button>
              <button onClick={() => { location.href = "/api/auth/login" }}>Join Voleeyo</button>
            </div>
          }
          {(user??false) &&
            <div className="section-one-action">
              <button onClick={() => { canShowTab() }}>Go to Dashboard</button>
            </div>
          }
        </div>
        {!isTest && <div className="section-two">
          <div className="section-two-image">
            <img src={imageLink.src} width={512} height={512} alt="picture of friends" />
          </div>
        </div>}
      </div>
      }
      {activeTab == "dashboard" && <Dashboard
        hideNav={hideNav}
        setHideNav={setHideNav}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        friendLookUp={friendLookUp}
        setFriendLookUp={setFriendLookUp} />}
      {activeTab == "notifications" && <Notifications
        hideNav={hideNav}
        setHideNav={setHideNav}
        
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        friendLookUp={friendLookUp}
        setFriendLookUp={setFriendLookUp} />}
      {activeTab == "friends" && <Friends hideNav={hideNav}
        setHideNav={setHideNav}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        friendLookUp={friendLookUp}
        setFriendLookUp={setFriendLookUp} />}
      {activeTab == "friendsNetwork" && <FriendsNetwork
        hideNav={hideNav}
        setHideNav={setHideNav}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        friendLookUp={friendLookUp}
        setFriendLookUp={setFriendLookUp} />}
      {activeTab == "account" && <Account  
        setActiveTab={setActiveTab}
        activeTab={activeTab}
         />}
      {activeTab == "about" && <About 
        setActiveTab={setActiveTab}
        activeTab={activeTab}
         />}
      {activeTab == "privacy" && <Privacy
        hideNav={hideNav}
        setHideNav={setHideNav}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
         />}
        {activeTab == "profile" && <Profile
        hideNav={hideNav}
        setHideNav={setHideNav}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
         />}
    </div>

  );
};
