// import './css/styles.css';
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
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isVisible,setIsVisible]=useState(false);
  const [secretCode, setSecretCode]= useState(null)

  useEffect(()=>{
    const testCode = localStorage.getItem("voleeyo_login");
    setSecretCode(testCode)
    if (testCode?.length>0) 
      setIsVisible(false);
    else
      setIsVisible(true);

    console.log("isVisible",isVisible)
  });
  const toggleNavMenuFunc= ()=>{
    var navbar=document.getElementById("navbar");
    // if(isVisible)
    // {
    //     navbar.style.display="none";
    //     setIsVisible(false);
    // }
    // else{
    //     navbar.style.display="unset";
    //     setIsVisible(true);
    // }
  }
  return (
     <div className='container'>
        <Head>
          <title>Voleeyo: create your path!</title>
        </Head>
        <Header isVisible={isVisible}/>
        <div className='main'>
        <NavMenu activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                toggleNavMenu={toggleNavMenuFunc} 
                secretCode={secretCode}/>
          <Component {...pageProps} />
        </div>
      </div>
    );
}
export default App;
