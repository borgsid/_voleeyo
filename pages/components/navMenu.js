import { useEffect, useState } from "react";
import imagelink1 from "../../assets/pencil-edit-button.svg"
const NavMenu = ({ activeTab, setActiveTab, toggleNavMenu }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [surname, setSurname] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const image1link = imagelink1.src;
  const image2link = imagelink1.src;
  const image3link = imagelink1.src;
  const image4link = imagelink1.src;
  const image5link = imagelink1.src;
  const handleTabClick = (tab) => {
    location.href = `/${tab}`
    setActiveTab(tab);
  };
  const handleLogout = () => {
    localStorage.removeItem("voleeyo_login");
    location.href = "/";
  };

  useEffect(() => {
    const secretCode = localStorage.getItem("voleeyo_login");
    if (!secretCode) 
      setIsVisible(true)
    else
      setIsVisible(false)
      
    const getUserData = async () => {
      const response = await fetch("/api/checkSecret", {
        method: "POST",
        body: JSON.stringify({ secretCode }),
      });
      const data = await response.json();
      if (data.status) {
        const name = data.name;
        const surname = data.surname;
        const email = data.email;
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
            <a href="#"><img src={image1link} /></a>
          </li>
          <li>
            <a href="#"><img src={image2link} /></a>
          </li>
          <li>
            <a href="#"><img src={image3link} /></a>
          </li>
          <li>
            <a href="#"><img src={image4link} /></a>
          </li>
          <li>
            <a href="#"><img src={image5link} /></a>
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
         {/* {isVisible&& <li>
            <a>Login</a>
          </li>} */}
          <li className="logout">
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default NavMenu;