import { useEffect,useState } from "react";
const NavMenu = ({activeTab,setActiveTab,toggleNavMenu}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [surname, setSurname] = useState('');
    
    const handleTabClick = (tab) => {
        location.href=`/${tab}`
        setActiveTab(tab);
    };
    const handleLogout = () => {
        localStorage.removeItem("voleeyo_login");
        location.href="/";
    };

    useEffect(() => {
        const secretCode = localStorage.getItem("voleeyo_login");
        if (!secretCode) {
          location.href = "/";
          return;
        }
        const getUserData = async ()=> {
            const response = await fetch("/api/checkSecret", {
                method: "POST",
                body: JSON.stringify({ secretCode }),
            });
            const data = await response.json();
            if(data.status){
                const name  =   data.name;
                const  surname  =    data.surname;
                const  email  =   data.email;
                setName(name);
                setSurname(surname);
                setEmail(email);
            }
        }
        getUserData();
      }, []);
    
      return (
        <div className="navbar" id="navbar">
        <svg onClick={toggleNavMenu} viewBox="0 0 100 80" width="40" height="40">
              <rect width="100" height="20"></rect>
              <rect y="30" width="100" height="20"></rect>
              <rect y="60" width="100" height="20"></rect>
          </svg>
      <div className="profile">
        <img
          src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
          alt="User profile picture"
        />
        <div>
          <h4>{name} {surname}</h4>
          <p>{email}</p>
        </div>
      </div>
      <div className="tabs">
        <div
          className={`tab ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => handleTabClick("dashboard")}
        >
          Dashboard
        </div>
        <div
          className={`tab ${activeTab === "notifications" ? "active" : ""}`}
          onClick={() => handleTabClick("notifications")}
        >
          Notifications
        </div>
        <div
          className={`tab ${activeTab === "friends" ? "active" : ""}`}
          onClick={() => handleTabClick("friends")}
        >
          Friends
        </div>
      </div>
      <div className="logout" onClick={handleLogout}>
        Logout
      </div>
    </div>
      );
}
export default NavMenu;