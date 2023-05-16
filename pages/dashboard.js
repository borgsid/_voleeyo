import { useEffect, useState } from "react";
import Image from 'next/image';
import ReactModal from 'react-modal';
import pencil from "../assets/pencil-edit-button.svg"
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
export default function Dashboard ({ activeTab, setActiveTab, hideNav, setHideNav }) {
    const {user} = useUser();
    var svgPencil = pencil;
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [hoverIndex, setHoverIndex] = useState(null);

    const [modEditEventName, setModEditEventName] = useState('');
    const [modEditEventLocation, setModEditEventLocation] = useState('');
    const [modEditEventRole, setModEditEventRole] = useState('');
    const [modEditEventYear, setModEditEventYear] = useState('');
    const [eventId, setEventId] = useState(0);
    const [isNavBarVIsible, setIsNavBarVIsible] = useState(false);

    useEffect(() => {
        setActiveTab("dashboard")
        console.log("hide nav before", hideNav)
        setHideNav(false)
        console.log("hide nav after", hideNav)
        const fetchData = async () => {
            const dataRaw = await fetch(`/api/user/EventsCards/${user.sub.split("|")[1]}`,
            {
                method:"get"
            });
            const dataResp = await dataRaw.json();

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
            eventRole
        };
        var apiService = isEdit
            ? "updateUserEvent"
            : "saveUserEvent";
        const response = await fetch(`/api/user/${apiService}/${user.sub.split("|")[1]}`, {
            method: "GET",
            }
        );

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
    const handleEditClick = (event) => {
        setIsEdit(true);
        setModEditEventName(event.eventName);
        setModEditEventLocation(event.eventLocation);
        setModEditEventYear(event.eventYear);
        setModEditEventRole(event.eventRole);
        setEventId(event.id)
        setIsModalOpen(true);
    }
    const resetValues = () => {
        setIsEdit(false);
        setModEditEventName(null);
        setModEditEventLocation(null);
        setModEditEventYear(null);
        setModEditEventRole(null);
        setEventId(null)
        setIsModalOpen(false)
    }
    const toggleNavMenu = () => {
        var navbar = document.getElementById("navbar");
        if (isNavBarVIsible) {
            navbar.style.display = "none";
            setIsNavBarVIsible(false);
        }
        else {
            navbar.style.display = "unset";
            setIsNavBarVIsible(true);
        }
    }
    return (
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
                                <Image alt="pencil icon" height={svgPencil.height} src={svgPencil.src} width={svgPencil.width} />
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
                        {isEdit
                            ? <h2>Edit Event:</h2>
                            : <h2>New Event:</h2>}
                        <div className="inline-modal">
                            <label htmlFor="event-name">Event Name:</label>
                            {isEdit
                                ? <input type="text" id="event-name" defaultValue={modEditEventName} />
                                : <input type="text" id="event-name" />
                            }
                        </div>
                        <div className="inline-modal">
                            <label htmlFor="event-location">Event Location:</label>
                            {isEdit
                                ? <input type="text" id="event-location" defaultValue={modEditEventLocation} />
                                : <input type="text" id="event-location" />
                            }
                        </div>
                        <div className="inline-modal">
                            <label htmlFor="event-year">Event Year:</label>
                            {isEdit
                                ? <input type="text" id="event-year" defaultValue={modEditEventYear} />
                                : <input type="text" id="event-year" />
                            }
                        </div>
                        <div className="inline-modal">
                            <label htmlFor="event-role">Event Role:</label>
                            {isEdit
                                ? <input type="text" id="event-role" defaultValue={modEditEventRole} />
                                : <input type="text" id="event-role" />
                            }
                        </div>
                        <div className="buttons-line">
                            {isEdit
                                ? <button type="submit">Update Event</button>
                                : <button type="submit">Add Event</button>
                            }
                            <button type="button" className="btn-search" onClick={resetValues}>Close</button>
                        </div>
                    </form>
                </div>
            </ReactModal>

        </div>
    );
}
export const getServerSideProps = withPageAuthRequired();