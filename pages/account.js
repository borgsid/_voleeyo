import { useState, useEffect } from 'react';
const Account = ({ activeTab, setActiveTab }) => {
    const [userDataVisible, setUserDataVisible] = useState(false);
    const [userEventDataVisible, setUserEventDataVisible] = useState(false);
    useEffect(() => {
        setActiveTab("account")
    });


    const handleUserDataToggle = () => {
        setUserDataVisible(!userDataVisible);
    };

    const handleUserEventToggle = () => {
        setUserEventDataVisible(!userEventDataVisible);
    };

    return (
        <div className="switch-container"> {/* Add the class name to the container element */}
          <h3>User data:</h3>
          <label>
            <input type="checkbox" checked={userDataVisible} onChange={handleUserDataToggle} />
            <span>Surname</span> {/* Wrap the label text in a span */}
          </label>
          <br />
          <label>
            <input type="checkbox" checked={userDataVisible} onChange={handleUserDataToggle} />
            <span>Contact button</span>
          </label>
          <br />
          <label>
            <input type="checkbox" checked={userDataVisible} onChange={handleUserDataToggle} />
            <span>Name of location</span>
          </label>
    
          <h3>User event data:</h3>
          <label>
            <input type="checkbox" checked={userEventDataVisible} onChange={handleUserEventToggle} />
            <span>Name of event</span>
          </label>
          <br />
          <label>
            <input type="checkbox" checked={userEventDataVisible} onChange={handleUserEventToggle} />
            <span>Location</span>
          </label>
          <br />
          <label>
            <input type="checkbox" checked={userEventDataVisible} onChange={handleUserEventToggle} />
            <span>Year</span>
          </label>
        </div>
      );
    };
    

export default Account;

