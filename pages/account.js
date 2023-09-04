import { useState, useEffect } from 'react';
import SingleEventCard from './components/singleEventCard';
import SingleFriendCard from './components/singleFriendCard';
import binIcon from "../assets/bin-delete-button.svg"

const Account = ({ activeTab, setActiveTab }) => {
  const [userDataVisible, setUserDataVisible] = useState(true);
  const [userContactMeButton, setUserContactMeButton] = useState(true);
  const [userEventDataVisible, setUserEventDataVisible] = useState(true);
  const [name, SetName] = useState("");
  const [surname, SetSurname] = useState("");
  const [year, SetYear] = useState("");
  const svgBin = binIcon;
  const event = {
    "id": 1,
    "eventUID": "xxxx",
    "eventName": "Torino Winter Univeriade",
    "eventYear": "2025",
    "eventLocation": "Turin",
    "eventRole": "Trainer",
    "userId": "xxxx"
  }
  const friend = {
    "id": 2,
    "name": "marco",
    "surname": "Polo",
    "profilePic": "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
    "f_uid": "xx",
    "userId": "rfxxf"
  }

  useEffect(() => {
    SetName(friend.name);
    SetSurname(friend.surname);
    SetYear(event.eventYear);
  }, []);


  const handleUserDataToggle = () => {

    if (document.getElementById("name-check").checked)
      SetSurname(friend.surname);
    else
      SetSurname("******");

    setUserDataVisible(!userDataVisible);
  };

  const handleContactMeToggle = () => {

    setUserContactMeButton(!userContactMeButton);
  };

  const handleUserEventToggle = () => {
    if (document.getElementById("year-check").checked)
      SetYear(event.eventYear)
    else
      SetYear("******")

    setUserEventDataVisible(!userEventDataVisible);
  };

  return (
    <>
    <div className="account-container">
      <div className="section">
        <p>
          In this section, you can control what information is visible on your Friends Card and Events Card.
          Toggle the checkboxes to decide what data you want to share with others.
        </p>
        <h3>User Data:</h3>
        <label>
          <input type="checkbox" id="name-check" checked={userDataVisible} onChange={handleUserDataToggle} />
          <span className="custom-checkbox"></span>
          <span>Show Surname</span>
        </label>
        <br />
        <label>
          <input type="checkbox" checked={userContactMeButton} onChange={handleContactMeToggle} />
          <span className="custom-checkbox"></span>
          <span>Show Contact Button</span>
        </label>
      </div>
      <div className="section">
        <h3>User Event Data:</h3>
        <label>
          <input type="checkbox" id="year-check" checked={userEventDataVisible} onChange={handleUserEventToggle} />
          <span className="custom-checkbox"></span>
          <span>Show Event Year</span>
        </label>
      </div>
    </div>
    <div className='cards-container' style={{ height: 'fit-content' }}>
      <style >{`
          .user-header{
            grid-row:1/2;
            grid-column: 2/3;
          }
          .friend-card{
            grid-row:2/3;
            grid-column: 2/3;
          }
          .event-header{
            grid-row:3/4;
            grid-column: 2/3;
          }
          .event-card{
            grid-row:4/5;
            grid-column: 2/3;
          }
          .cards-container{
            place-items:center
          }
        `}
      </style>
      <div className='user-header'>
        <h3>User Details Card</h3>
      </div>
      <SingleFriendCard
        index={friend.f_uid}
        key={friend.f_uid}
        friend={{ id: friend.id, name, surname, f_uid: friend.f_uid, profilePic: friend.profilePic, userId: friend.userId }}
        setActiveTabFunc={() => { }}
        addNewFriendFunc={() => { }}
        canContact={userContactMeButton}
        svgBin={svgBin}
        isMyFriend={false}
      />
      <div className='event-header'>
        <h3>Event Details Card</h3>
      </div>
      <SingleEventCard index={'xxx'}
        hoverIndex={99}
        event={{
          id: event.id,
          eventUID: event.eventUID,
          eventName: event.eventName,
          eventYear: year,
          eventLocation: event.eventLocation,
          eventRole: event.eventRole,
        }}
        svgPencil={() => { return true }}
        handleEditClickFunc={() => { return true }}
        handleMouseLeaveFunc={() => { return true }}
        handleMouseEnterFunc={() => { return true }}
      />
    </div>
  </>
  
  );
};


export default Account;

