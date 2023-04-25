import React from 'react';
import { useState } from "react";

import './UserCards.css';

const MyCards = () => {
    const events = [
        {
            eventName: "Charity Walk",
            year: 2022,
            city: "New York",
            role: "Volunteer"
        },
        {
            eventName: "Food Drive",
            year: 2022,
            city: "Chicago",
            role: "Donor"
        },
        {
            eventName: "Environmental Cleanup",
            year: 2021,
            city: "San Francisco",
            role: "Volunteer"
        },
        {
            eventName: "Blood Drive",
            year: 2021,
            city: "Los Angeles",
            role: "Donor"
        },
        {
            eventName: "Animal Shelter Volunteer",
            year: 2020,
            city: "Seattle",
            role: "Volunteer"
        },
        {
            eventName: "Community Garden",
            year: 2020,
            city: "Denver",
            role: "Volunteer"
        }
    ];

    const renderCards = () => {

        const [showModal, setShowModal] = useState(false);
        const [selectedEvent, setSelectedEvent] = useState(null);

        const openModal = (event) => {
            setSelectedEvent(event);
            setShowModal(true);
        };

        const closeModal = () => {
            setSelectedEvent(null);
            setShowModal(false);
        };

        const handleEdit = (event) => {
            // Handle editing of event data here
            console.log("Editing event:", event);
            closeModal();
        };

        const cardStyle = {
            boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
            transition: "transform 0.3s",
        };


        const rederResponseData= ()=>events.map((event, index) => {
            return (
                <div className="card" key={index}
                    style={showModal ? { display: "none" } : cardStyle}
                    onClick={() => openModal(event)}
                >
                    <div className="card-body">
                        <h5 className="card-title">{event.eventName}</h5>
                        <p className="card-text">City: {event.city}</p>
                        <p className="card-text">Year: {event.year}</p>
                        <p className="card-text">Role: {event.role}</p>
                    </div>
                </div>
            );
        });
        return (
            <>
            <div className='row'>
                {rederResponseData()}
            </div>
                {showModal && (
                    <div className="modal">
                    <div className="modal-content">
                      <span className="close" onClick={closeModal}>
                        &times;
                      </span>
                      <h2>Edit Event</h2>
                      <form onSubmit={(e) => {
                                e.preventDefault();
                                handleEdit(selectedEvent);
                            }}>
                        <div className="form-group">
                          <label htmlFor="eventName">Event Name:</label>
                          <input
                            type="text"
                            id="eventName"
                            name="eventName"
                            defaultValue={selectedEvent.eventName}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="city">City:</label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            defaultValue={selectedEvent.city}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="year">Year:</label>
                          <input
                            type="number"
                            id="year"
                            name="year"
                            defaultValue={selectedEvent.year}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="role">Role:</label>
                          <input
                            type="text"
                            id="role"
                            name="role"
                            defaultValue={selectedEvent.role}
                          />
                        </div>
                        <button type="submit">Save Changes</button>
                      </form>
                    </div>
                  </div>
                  
                )}
            </>
        );
    }
    return (
        <div className="container">
                {renderCards()}
        </div>
    );
}
export default MyCards;
