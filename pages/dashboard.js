import { useEffect, useState } from "react";
import Image from 'next/image';
import ReactModal from 'react-modal';
import pencil from "../assets/pencil-edit-button.svg"
import binIcon from "../assets/bin-delete-button.svg"
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import AutocompleteEventCard from "../pages/components/inputEventsWithSuggestions";
import Loader from "./components/loader"
import SingleEventCard from "./components/singleEventCard";
export default function Dashboard({setActiveTab, hideNav, setHideNav }) {
    const { user } = useUser();
    var svgPencil = pencil;
    var svgBin = binIcon;
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [hoverIndex, setHoverIndex] = useState(null);

    const [modEditEventName, setModEditEventName] = useState('');
    const [modEditEventLocation, setModEditEventLocation] = useState('');
    const [modEditEventRole, setModEditEventRole] = useState('');
    const [modEditEventYear, setModEditEventYear] = useState(0);
    const [eventId, setEventId] = useState(0);
    const [eventGuid, setEventGuiD] = useState(null);
    const [isNavBarVIsible, setIsNavBarVIsible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [isLoadingCards, setIsLoadingCards] = useState(true);

    useEffect(() => {
        setActiveTab("dashboard")
        setHideNav(false)
        const fetchData = async () => {
            const dataRaw = await fetch(`/api/user/EventsCards/${user.sub.split("|")[1]}`,
                {
                    method: "get"
                });
            const dataResp = await dataRaw.json();

            if (dataResp.length === 0) {
                setEvents([]);
            } else {
                setEvents(dataResp);
            }
            setIsLoadingCards(false)
        }

        fetchData();
        setIsEdit(false);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        const eventName = document.getElementById("event-name").value;
        const eventLocation = document.getElementById("event-location").value;
        const eventYear = document.getElementById("event-year").value;
        const eventRole = document.getElementById("event-role").value;
        const uid = document.getElementById("event-uid").value;

        const data = isEdit ? {
            uid,
            eventName,
            eventLocation,
            eventYear,
            eventRole
        } :
            {
                eventName,
                eventLocation,
                eventYear,
                eventRole
            };
        var link = isEdit
            ? "updateUserEvent"
            : "saveUserEvent";
        const response = await fetch(`/api/user/${link}/${user.sub.split("|")[1]}`, {
            method: "POST",
            body: JSON.stringify({
                data
            }),
        });

        if (!response.ok) {
            alert("Failed to save event.");
        }
        setIsLoading(false)
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
        setEventGuiD(event.eventUID)
        setIsModalOpen(true);
    }
    const resetValues = () => {
        setIsEdit(false);
        setModEditEventName(null);
        setModEditEventLocation(null);
        setModEditEventYear(0);
        setModEditEventRole(null);
        setEventId(0)
        setEventGuiD(null)
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
    const deleteCard = async (cardGuid) => {
        setIsDeleteLoading(true);
        var resp = await fetch(`/api/user/deleteEvent/${user.sub.split("|")[1]}`,
            {
                method: "post",
                body: JSON.stringify({ cardGuid })
            })

        if (resp.ok) {
            const currentEvents = await resp.json();
            setEvents(currentEvents);
            resetValues();
        }
        else
            alert("There was an error processing your request");
        setIsDeleteLoading(false);
    }
    return (
        <div className="content">
            <div className="page-header">
                <h2>Hi there fellow volunteer, </h2>
                <svg onClick={toggleNavMenu} viewBox="0 0 100 80" width="40" height="40">
                    <rect width="100" height="20"></rect>
                    <rect y="30" width="100" height="20"></rect>
                    <rect y="60" width="100" height="20"></rect>
                </svg>
            </div>
            <h3>These are your Volunteer events, add and edit them as you like.</h3>
            {
                !isLoadingCards &&events?.length>0&& <div className="dashboard-cards cards-container">
                    {events.map((event) => (
                        <SingleEventCard key={ event?.eventUID}
                                        index={ event?.eventUID}
                                        hoverIndex={hoverIndex}
                                        svgPencil={svgPencil}
                                        event={event}
                                        handleEditClickFunc={handleEditClick}
                                        handleMouseLeaveFunc={handleMouseLeave}
                                        handleMouseEnterFunc={handleMouseEnter}/>
                    ))}
                </div>
            }
            {isLoadingCards && <h3 id="loading-header">Loading <Loader /></h3>}
            <button className="fab" onClick={() => setIsModalOpen(true)}>+</button>
            <ReactModal className="modal" isOpen={isModalOpen} onRequestClose={resetValues} ariaHideApp={false}>
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        {eventId > 0 && !isDeleteLoading &&
                            <div className="delete-icon" onClick={() => { deleteCard(eventGuid) }}>
                                <Image alt="delete icon" height={svgBin.height} src={svgBin.src} width={svgBin.width} />
                            </div>
                        }
                        {eventId > 0 && isDeleteLoading &&
                            <Loader />
                        }
                        <input type="text" readOnly hidden id="event-uid" defaultValue={eventGuid} />
                        {isEdit
                            ? <h2>Edit Event:</h2>
                            : <h2>New Event:</h2>}
                        <div className="inline-modal">
                            <label htmlFor="event-name">Event Name:</label>
                            <AutocompleteEventCard isEdit={isEdit} modEditEventName={modEditEventName} />
                        </div>
                        <div className="inline-modal">
                            <label htmlFor="event-location">Event Location:</label>
                            {isEdit
                                ? <input type="text" id="event-location" defaultValue={modEditEventLocation} />
                                :
                                <input type="text" id="event-location" />
                            }
                        </div>
                        <div className="inline-modal">
                            <label htmlFor="event-year">Event Year:</label>
                            {isEdit
                                ? <input type="number" id="event-year" defaultValue={modEditEventYear} />
                                : <input type="number" id="event-year" />
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

                            {isEdit && !isLoading &&
                                <button type="submit">Update Event</button>
                            }
                            {!isEdit && !isLoading &&
                                <button type="submit">Add Event</button>
                            }
                            {isLoading &&
                                <Loader />
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