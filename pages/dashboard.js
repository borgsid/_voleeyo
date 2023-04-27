import { useEffect,useState } from "react";
import ReactModal from 'react-modal';
import svgPencil from "../assets/pencil-edit-button.svg"
const Dashboard = () => {
    const [events,setEvents]= useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [surname, setSurname] = useState('');
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isModalOpen,setIsModalOpen] = useState();
    const [isEdit,setIsEdit]= useState(false);
    const [hoverIndex, setHoverIndex] = useState(null);

    const [modEditEventName, setModEditEventName] = useState('');
    const [modEditEventLocation, setModEditEventLocation] = useState('');
    const [modEditEventRole, setModEditEventRole] = useState('');
    const [modEditEventYear, setModEditEventYear] = useState('');
    const [eventId, setEventId] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

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
        setIsEdit(false);
      }, []);
      
        const handleTabClick = (tab) => {
            setActiveTab(tab);
            location.href=`/${tab}`
        };
        const handleLogout = () => {
            localStorage.removeItem("voleeyo_login");
            location.href="/";
        };

        const handleSubmit = async (event) => {
            event.preventDefault();
            const secretCode = localStorage.getItem("voleeyo_login");
            const eventName = document.getElementById("event-name").value;
            const eventLocation = document.getElementById("event-location").value;
            const eventYear = document.getElementById("event-year").value;
            const eventRole = document.getElementById("event-role").value;
            const id = document.getElementById("event-id").value;

            const data = {
                id,
                eventName,
                eventLocation,
                eventYear,
                eventRole,
            };
            var link = isEdit
                ?"/api/updateUserEvent"
                :"/api/saveUserEvent";
            const response = await fetch(link, {
                method: "POST",
                body: JSON.stringify({
                data,
                secretCode: secretCode,
                }),
            });
            
            if (!response.ok) {
                alert("Failed to save event.");
            }
            
            setIsModalOpen(false);
            setEvents(await response.json());
        };

        const handleMouseEnter = (index) => {
        setHoverIndex(index);
        }

        const handleMouseLeave = () => {
        setHoverIndex(null);
        }
        const handleEditClick=(event)=>{
            setIsEdit(true);
            setModEditEventName(event.eventName);
            setModEditEventLocation(event.eventLocation);
            setModEditEventYear(event.eventYear);
            setModEditEventRole(event.eventRole);
            setEventId(event.id)
            setIsModalOpen(true);
        }
        const resetValues= ()=>{
            setIsEdit(false);
            setModEditEventName(null);
            setModEditEventLocation(null);
            setModEditEventYear(null);
            setModEditEventRole(null);
            setEventId(null)
        }
        const toggleNavMenu= ()=>{
            console.log("im clicked")
            var navbar=document.getElementById("navbar");
            if(isVisible)
            {
                navbar.style.display="none";
                setIsVisible(false);
            }
            else{
                navbar.style.display="unset";
                setIsVisible(true);
            }
        }
    return ( 
        <div className="dashboard">
            <div className="navbar"  id="navbar">
                <svg onClick={toggleNavMenu} viewBox="0 0 100 80" width="40" height="40">
                    <rect width="100" height="20"></rect>
                    <rect y="30" width="100" height="20"></rect>
                    <rect y="60" width="100" height="20"></rect>
                </svg>
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
                <div className="page-header">
                    <h2>Hi Demo User!</h2>
                    <svg onClick={toggleNavMenu} viewBox="0 0 100 80" width="40" height="40">
                        <rect width="100" height="20"></rect>
                        <rect y="30" width="100" height="20"></rect>
                        <rect y="60" width="100" height="20"></rect>
                    </svg>
                </div>
                <h3>These are your Volunteer events, add and edit them as you like.</h3>
                <div className="dashboard-cards cards-container">
                    {events.map((event, index) => (
                    <div key={index} className="event-card"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}>
                        <h4>{event.eventName}</h4>
                        <p>{event.eventLocation}</p>
                        <p>{event.eventYear}</p>
                        <p>{event.eventRole}</p>
                        {hoverIndex === index && (
                        <div className="edit-icon" onClick={() => handleEditClick(event)}>
                            <img height={svgPencil.height} src={svgPencil.src}/>
                        </div>
                        )}
                    </div>
                    ))}
                </div>
                <button className="fab" onClick={() => setIsModalOpen(true)}>+</button>
                <ReactModal className="modal" isOpen={isModalOpen} onRequestClose={() => {setIsModalOpen(false); resetValues()}} ariaHideApp={false}>
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}>
                        <input type="number" readonly hidden id="event-id" defaultValue={eventId} />
                        {   isEdit
                            ?<h2>Edit Event:</h2>
                            :<h2>New Event:</h2>}
                        <div className="inline-modal">
                            <label htmlFor="event-name">Event Name:</label>
                            {   isEdit
                                ?<input type="text" id="event-name" defaultValue={modEditEventName} />
                                :<input type="text" id="event-name" />
                            }
                        </div>
                        <div  className="inline-modal">
                            <label htmlFor="event-location">Event Location:</label>
                            {   isEdit
                                ? <input type="text" id="event-location" defaultValue={modEditEventLocation} />
                                : <input type="text" id="event-location" />
                            }
                        </div>
                        <div  className="inline-modal">
                            <label htmlFor="event-year">Event Year:</label>
                            {   isEdit
                                ?<input type="text" id="event-year"  defaultValue={modEditEventYear}/>
                                :<input type="text" id="event-year" />
                            }
                        </div>
                        <div  className="inline-modal">
                            <label htmlFor="event-role">Event Role:</label>
                            {   isEdit
                                ? <input type="text" id="event-role" defaultValue={modEditEventRole}/>
                                :<input type="text" id="event-role" />
                            }
                        </div>
                        {   isEdit
                            ? <button type="submit">Update Event</button>
                            : <button type="submit">Add Event</button>
                        }
                        </form>
                    </div>
                </ReactModal>

            </div>
        </div>
      );
}
export default Dashboard;