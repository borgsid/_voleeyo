import { useState, useEffect } from 'react';
import SingleEventCard from './components/singleEventCard';
const Account = ({ activeTab, setActiveTab }) => {
  const [userDataVisible, setUserDataVisible] = useState(false);
  const [userEventDataVisible, setUserEventDataVisible] = useState(false);

  const event = {
    "id": 1,
    "eventUID": "xxxx",
    "eventName": "Torino Winter Univeriade",
    "eventYear": "2025",
    "eventLocation": "Turin",
    "eventRole": "Trainer",
    "userId": "xxxx"
  }
  useEffect(() => {
    setActiveTab("account")
  });


  const handleUserDataToggle = () => {
    setUserDataVisible(!userDataVisible);
  };

  const handleUserEventToggle = () => {
    setUserEventDataVisible(!userEventDataVisible);
  };

  // if(activeTab=='account')
    return  (
      <>
       
        <div className="account-container">
          <div className="section">
            <h3>User Data:</h3>
            <label>
              <input type="checkbox" checked={userDataVisible} onChange={handleUserDataToggle} />
              <span className="custom-checkbox"></span>
              <span>Surname</span>
            </label>
            <br />
            <label>
              <input type="checkbox" checked={userDataVisible} onChange={handleUserDataToggle} />
              <span className="custom-checkbox"></span>
              <span>Contact button</span>
            </label>
          </div>
          <div className="section">
            <h3>User Event Data:</h3>
            <label>
              <input type="checkbox" checked={userEventDataVisible} onChange={handleUserEventToggle} />
              <span className="custom-checkbox"></span>
              <span>Year</span>
            </label>
          </div>
        </div>
        <div className='cards-container' style={{height:'fit-content'}}>
        <style >{`
            .event-card{
              grid-column: 2/3
            }
          `}
        </style>
          <SingleEventCard index={'xxx'}
            hoverIndex={99}
            event={event}
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

