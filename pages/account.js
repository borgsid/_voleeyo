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
        <div>
            <h3>User data:</h3>
            <label>
                <input type="checkbox" checked={userDataVisible} onChange={handleUserDataToggle} />
                Surname
            </label>
            <br />
            <label>
                <input type="checkbox" checked={userDataVisible} onChange={handleUserDataToggle} />
                Contact button
            </label>
            <br />
            <label>
                <input type="checkbox" checked={userDataVisible} onChange={handleUserDataToggle} />
                Name of location
            </label>

            <h3>User event data:</h3>
            <label>
                <input type="checkbox" checked={userEventDataVisible} onChange={handleUserEventToggle} />
                Name of event
            </label>
            <br />
            <label>
                <input type="checkbox" checked={userEventDataVisible} onChange={handleUserEventToggle} />
                Location
            </label>
            <br />
            <label>
                <input type="checkbox" checked={userEventDataVisible} onChange={handleUserEventToggle} />
                Year
            </label>
        </div>
    );
};

export default Account;

