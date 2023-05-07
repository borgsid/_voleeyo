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
  const [secretCode, setSecretCode]= useState(null)

  useEffect(()=>{
    const testCode = localStorage.getItem("voleeyo_login");
    setSecretCode(testCode)
    if (testCode?.length>0) 
      setIsVisible(false);
    else
      setIsVisible(true);

    setActiveTab("index")
  });
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
        <NavMenu 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                toggleNavMenu={toggleNavMenuFunc} 
                secretCode={secretCode}/>
          <Component {...pageProps} 
                    activeTab={activeTab} 
                  setActiveTab={setActiveTab} 
                  secretCode={secretCode}
                  isVisible={isVisible} />
        </div>
      </div>
    );
}
export default App;
