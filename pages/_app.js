// import './css/styles.css';
import { useEffect,useState } from "react";
import './css/newpage.css'
import './css/dashboard.css';
import './css/notifications.css';
import './css/friends.css';
import './css/friendsNetwork.css';
import NavMenu from "./components/navMenu";
import  Header from "./components/Header";
function App({ Component, pageProps }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isVisible,setIsVisible]=useState(true)

  useEffect(()=>{
    const testCode = localStorage.getItem("voleeyo_login");
    console.log("testCode",testCode)
    if (testCode) 
      setIsVisible(false);
    else
      setIsVisible(true);
  });
  const toggleNavMenu= ()=>{
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
        <Header isVisible={isVisible}/>
        <div className='main'>
        <NavMenu activeTab={activeTab} setActiveTab={setActiveTab} toggleNavMenu={toggleNavMenu}/>
          <Component {...pageProps} />
        </div>
      </div>
    );
}
export default App;
