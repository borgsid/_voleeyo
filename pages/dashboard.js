import { useEffect,useState } from "react";
import ReactModal from 'react-modal';
import svgPencil from "../assets/pencil-edit-button.svg"
import NavMenu from "./navMenu"; 
const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [events,setEvents]= useState([]);
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

        const fetchData = async ()=>{
            const dataRaw = await fetch("/api/userEventsCards", {
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
        fetchData();
        setIsEdit(false);
      }, []);
       
      
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
                    secretCode
                }),
            });
            
            if (!response.ok) {
                alert("Failed to save event.");
            }
            
            setEvents(await response.json());
            resetValues();
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
            setIsModalOpen(false)
        }
        const toggleNavMenu= ()=>{
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
            <NavMenu activeTab={activeTab} setActiveTab={setActiveTab}/>
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
                <ReactModal className="modal" isOpen={isModalOpen} onRequestClose={resetValues} ariaHideApp={false}>
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}>
                        <input type="number" readOnly hidden id="event-id" defaultValue={eventId} />
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