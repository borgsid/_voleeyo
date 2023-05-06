import { useEffect, useState } from "react";
import instagamSvg  from "../../assets/iconmonstr-instagram-11.svg"
import facebookSvg  from "../../assets/iconmonstr-facebook-3.svg"
import twitterSvg from "../../assets/iconmonstr-twitter-1.svg"
import tik_tokSvg from "../../assets/iconmonstr-audio-thin.svg"

const NavMenu = ({ activeTab, setActiveTab, toggleNavMenu , secretCode, currentUser}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [surname, setSurname] = useState('');

  var instagam = instagamSvg.src;
  var facebook = facebookSvg.src;
  var twitter = twitterSvg.src;
  var tik_tok = tik_tokSvg.src;
  
  const handleTabClick = (tab) => {
    location.href = `/${tab}`
    setActiveTab(tab);
  };
  const handleLogout = () => {
    localStorage.removeItem("voleeyo_login");
    location.href = "/";
  };

  useEffect(() => {
    const getUserData =  () => {
      if (currentUser) {
        const name = currentUser.name;
        const surname = currentUser.surname;
        const email = currentUser.email;
        setName(name);
        setSurname(surname);
        setEmail(email);
      }
    }
    getUserData();
  }, []);

  return (
    <div className="sidemenu navbar" id="navbar">
      <svg onClick={toggleNavMenu} fill="white" viewBox="0 0 100 80" width="40" height="40">
        <rect width="100" height="20"></rect>
        <rect y="30" width="100" height="20"></rect>
        <rect y="60" width="100" height="20"></rect>
      </svg>
      <div className="profile avatar">
        <img
          src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
          alt="User profile picture"
        />
      </div>
      <div className="name">
        <h4>{name} {surname}</h4>
      </div>
      <div className="name">
        <p>{email}</p>
      </div>
      <div className="socials">
        <ul>
          <li>
            <a href="#"><img src={instagam} /></a>
          </li>
          <li>
            <a href="#"><img src={facebook} /></a>
          </li>
          <li>
            <a href="#"><img src={twitter} /></a>
          </li>
          <li>
            <a href="#"><img src={tik_tok} /></a>
          </li>
        </ul>
      </div>
      <hr/>
      <div className="group1">
        <ul>
          <li
            className={`tab ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => handleTabClick("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={`tab ${activeTab === "notifications" ? "active" : ""}`}
            onClick={() => handleTabClick("notifications")}
          >
            Notifications
          </li>
          <li
            className={`tab ${activeTab === "friends" ? "active" : ""}`}
            onClick={() => handleTabClick("friends")}
          >
            Friends
          </li>
        </ul>
      </div>
      <hr/>
      <div className="group2">
        <ul>
          <li className="logout">
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default NavMenu;