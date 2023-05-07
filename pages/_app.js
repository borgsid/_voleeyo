import { useEffect,useState } from "react";
import Head from 'next/head';
import './css/newpage.css'
import './css/dashboard.css';
import './css/notifications.css';
import './css/friends.css';
import './css/friendsNetwork.css';
import NavMenu from "./components/navMenu";
import  Header from "./components/Header";
function App({ Component, pageProps }) {
  const [activeTab, setActiveTab] = useState(null);
  const [isVisible,setIsVisible]=useState(false);
  const [hideNav,setHideNav]= useState(true);
  const [secretCode, setSecretCode]= useState("")
  const [friendLookUp,setFriendLookUp]=useState({});

  useEffect(()=>{
    setSecretCode(localStorage.getItem("voleeyo_login"));
    if (secretCode?.length>0) 
      setIsVisible(false);
    else
     {
        setIsVisible(true);
      }
  },[hideNav]);
  const toggleNavMenuFunc= ()=>{
    if(isVisible)
    {
      setIsVisible(false);
    }
    else{
      setIsVisible(true);
    }
  }
  return (
     <div className='container'>
        <Head>
          <title>Voleeyo: create your path!</title>
        </Head>
        <Header isVisible={isVisible} activeTab={ activeTab} setActiveTab={setActiveTab}/>
        <div className='main'>
        {hideNav&&<NavMenu 
                activeTab={activeTab} 
                hideNav={hideNav}
                setHideNav={setHideNav}
                setActiveTab={setActiveTab} 
                toggleNavMenu={toggleNavMenuFunc} 
                secretCode={secretCode}/>}
          <Component {...pageProps} 
                  hideNav={hideNav}
                  setHideNav={setHideNav}
                  activeTab={activeTab} 
                  setActiveTab={setActiveTab} 
                  secretCode={secretCode}
                  setSecretCode={setSecretCode}
                  isVisible={isVisible} 
                  friendLookUp={friendLookUp}
                  setFriendLookUp={setFriendLookUp}/>
        </div>
      </div>
    );
}
export default App;
