import { useEffect, useState } from "react";
import Image from 'next/image';
import instagamSvg from "../../assets/iconmonstr-instagram-11.svg"
import facebookSvg from "../../assets/iconmonstr-facebook-3.svg"
import twitterSvg from "../../assets/iconmonstr-twitter-1.svg"
import tik_tokSvg from "../../assets/iconmonstr-audio-thin.svg"

const NavMenu = ({ activeTab, setActiveTab, toggleNavMenu, secretCode, currentUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [surname, setSurname] = useState('');

  var instagam = instagamSvg;
  var facebook = facebookSvg;
  var twitter = twitterSvg;
  var tik_tok = tik_tokSvg;

  const handleTabClick = (tab) => {
    console.log(" setting tab",tab)
    setActiveTab(tab);
  };
  const handleLogout = () => {
    localStorage.removeItem("voleeyo_login");
    location.href = "/";
  };

  useEffect(() => {

    const getUserData = () => {
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
  }, [activeTab]);

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
            <a href="#"><Image alt="social icon" src={instagam.src} width={instagam.width} height={instagam.height} /></a>
          </li>
          <li>
            <a href="#"><Image alt="social icon" src={facebook} width={facebook.width} height={facebook.height}/></a>
          </li>
          <li>
            <a href="#"><Image alt="social icon" src={twitter} width={twitter.width} height={twitter.height}/></a>
          </li>
          <li>
            <a href="#"><Image alt="social icon" src={tik_tok} width={tik_tok.width} height={tik_tok.height} /></a>
          </li>
        </ul>
      </div>
      <hr />
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
            className={`tab ${activeTab === "friends"||activeTab === "friendsNetwork" ? "active" : ""}`}
            onClick={() => handleTabClick("friends")}
          >
            Friends
          </li>
        </ul>
      </div>
      <hr />
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