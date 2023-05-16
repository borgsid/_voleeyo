import { useEffect, useState } from "react";
import Head from 'next/head';
import './css/newpage.css'
import './css/dashboard.css';
import './css/notifications.css';
import './css/friends.css';
import './css/friendsNetwork.css';
import './css/account.css'
import './css/about.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';  
import logo from "../assets/fav icon.png"
import NavMenu from "./components/navMenu";
import Header from "./components/Header";
function App({ Component, pageProps }) {
  const [activeTab, setActiveTab] = useState("index");
  const [isVisible, setIsVisible] = useState(false);
  const [hideNav, setHideNav] = useState(true);
  const [secretCode, setSecretCode] = useState("")
  const [friendLookUp, setFriendLookUp] = useState({});
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState({})
  
  useEffect(() => {
      setIsVisible(true);
  }, [hideNav, showSideMenu]);
  const toggleNavMenuFunc = () => {
    if (isVisible) {
      setIsVisible(false);
    }
    else {
      setIsVisible(true);
    }
  }

  return (
    <UserProvider>
      <div className='container'>
        <Head>
          <title>Voleeyo: create your path!</title>
          <link rel="icon" type="image/png" size="16x16" href={logo.src}></link>

        </Head>
        <Header isVisible={isVisible} activeTab={activeTab} setActiveTab={setActiveTab} />
        <footer><span>not optimized for mobile</span></footer>

        <div className='main'>
          {!hideNav && <NavMenu
            activeTab={activeTab}
            hideNav={hideNav}
            setHideNav={setHideNav}
            setActiveTab={setActiveTab}
            toggleNavMenu={toggleNavMenuFunc}
            secretCode={secretCode}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser} />}
          <Component {...pageProps}
            hideNav={hideNav}
            setHideNav={setHideNav}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            secretCode={secretCode}
            setSecretCode={setSecretCode}
            isVisible={isVisible}
            showSideMenu={showSideMenu}
            setShowSideMenu={setShowSideMenu}
            friendLookUp={friendLookUp}
            setFriendLookUp={setFriendLookUp} />
        </div>
      </div>
    </UserProvider>
  );
}
export default App;
