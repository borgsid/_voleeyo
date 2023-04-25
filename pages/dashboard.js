import { useEffect,useState } from "react";
const Dashboard = () => {
    const [events,setEvents]= useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [surname, setSurname] = useState('');
    const [activeTab, setActiveTab] = useState("dashboard");
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

        const fetchData = async ()=>{
            const dataRaw = await fetch("/api/userCards", {
                method: "POST",
                body: JSON.stringify({ secretCode }),
            });
            const dataResp=await dataRaw.json();
      
            if (dataResp.length === 0) {
                setEvents([]);
            } else {
            setEvents(dataResp);
            }
        }
        getUserData();
        fetchData();
      }, []);
      
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const handleLogout = () => {
        localStorage.removeItem("voleeyo_login");
        location.href="/";
      };
    return (
        <div className="dashboard">
          <div className="navbar">
          <div className="profile">
                <img src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp" alt="User profile picture" />
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
          <div className="content">
            <h2>Hi Demo User!</h2>
            <h3>These are your Volunteer events, add and edit them as you like.</h3>
            <div className="dashboard-cards cards-container">
                {events.map((event, index) => (
                    <div key={index} className="event-card">
                    <h4>{event.eventName}</h4>
                    <p>{event.eventLocation}</p>
                    <p>{event.eventYear}</p>
                    <p>{event.eventRole}</p>
                    </div>
                ))}
            </div>
            <button className="fab">+</button>
          </div>
        </div>
      );
}
export default Dashboard;