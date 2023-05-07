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
import Login from './login';
const index = ({ showSideMenu, setShowSideMenu, hideNav, setHideNav, activeTab, setActiveTab, isVisible, friendLookUp, setFriendLookUp, secretCode, setSecretCode }) => {
  const [currnerTab, setCurrentTab] = useState("index");
  const canShowTab = () => {
    setActiveTab("dashboard");
    console.log("now activeTab", activeTab)
    if (activeTab)
      switch (activeTab) {
        case "dashboard":
        case "notifications":
        case "friends":
        case "friendsNetwork":
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

    console.log("showSideMenu index", showSideMenu)
  }
  useEffect(() => {
    var testCode = localStorage.getItem("voleeyo_login")
    if (testCode)
      setSecretCode(testCode)
    if (secretCode != undefined) {
      setHideNav(false)
      setCurrentTab("index")
    }
    else
      setCurrentTab("login")

    // canShowTab();
  }, [activeTab, secretCode, hideNav])
  return (
    <div className="index dashboard">
      {(activeTab == "index" || activeTab == "login") && <div className="dashboard-container">
        <div className="section-one">

          {activeTab == "index" &&
            <div className="section-one-text">
              {isVisible && <h1>Voleeyo: your LinkedIn for volunteers</h1>}
              {!isVisible && <h1>Welcome back to Voleeyo</h1>}
              <b>A place where to connect while giving back to the community</b>
              {
                isVisible && <p>
                  Voleeyo is a platform where volunteers connect to improve skills, make friends, and find job opportunities.<br />
                  Join a community of like-minded individuals, work on impactful initiatives, and showcase your skills. <br />
                  Make a difference today with Voleeyo.
                </p>
              }
              {!isVisible && <p>Find out what you friends have been up to and connect with new ones!</p>}
              <div className="social-links">
                <a href="#" target="_blank" rel="noopener noreferrer">Instagram (Coming soon)</a>
                <a href="https://twitter.com/Voleeyo" target="_blank" rel="noopener noreferrer">Twitter (WIP)</a>
              </div>
                  <br/>
                  <br/>
                  <span>Like what I'm doing, here are some links</span>
                  
              <div className="social-links">
                  <a href="https://www.buymeacoffee.com/sydneylukee" target="_blank" rel="noopener noreferrer">Buy me a coffee</a>
                  <a href="https://github.com/borgsid/_voleeyo" target="_blank" rel="noopener noreferrer">Github repo</a>
              </div>
            </div>
          }
          {((secretCode == null || secretCode?.length == 0) && activeTab == "login") &&
            <Login
              hideNav={hideNav}
              setHideNav={setHideNav}
              secretCode={secretCode}
              setSecretCode={setSecretCode}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          }

          {isVisible &&
            <div className="section-one-action">
              <button onClick={() => {
                setActiveTab(currnerTab)
              }}>Discover Voleeyo</button>
              <button onClick={() => { setActiveTab(currnerTab) }}>Join Voleeyo</button>
            </div>
          }
          {!isVisible &&
            <div className="section-one-action">
              <button onClick={() => { canShowTab() }}>Go to Dashboard</button>
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
      {activeTab == "dashboard" && <Dashboard
        hideNav={hideNav}
        setHideNav={setHideNav}
        secretCode={secretCode}
        setSecretCode={setSecretCode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        friendLookUp={friendLookUp}
        setFriendLookUp={setFriendLookUp} />}
      {activeTab == "notifications" && <Notifications
        hideNav={hideNav}
        setHideNav={setHideNav}
        secretCode={secretCode}
        setSecretCode={setSecretCode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        friendLookUp={friendLookUp}
        setFriendLookUp={setFriendLookUp} />}
      {activeTab == "friends" && <Friends hideNav={hideNav}
        setHideNav={setHideNav}
        secretCode={secretCode}
        setSecretCode={setSecretCode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        friendLookUp={friendLookUp}
        setFriendLookUp={setFriendLookUp} />}
      {activeTab == "friendsNetwork" && <FriendsNetwork
        hideNav={hideNav}
        setHideNav={setHideNav}
        secretCode={secretCode}
        setSecretCode={setSecretCode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        friendLookUp={friendLookUp}
        setFriendLookUp={setFriendLookUp} />}
      {activeTab == "account" && <Account secretCode={secretCode}
        setSecretCode={setSecretCode}
        activeTab={activeTab}
        setActiveTab={setActiveTab} />}
      {activeTab == "about" && <About secretCode={secretCode}
        setSecretCode={setSecretCode}
        activeTab={activeTab}
        setActiveTab={setActiveTab} />}
      {activeTab == "privacy" && <Privacy
        hideNav={hideNav}
        setHideNav={setHideNav}
        secretCode={secretCode}
        setSecretCode={setSecretCode}
        activeTab={activeTab}
        setActiveTab={setActiveTab} />}
    </div>
  );
};

export default index;