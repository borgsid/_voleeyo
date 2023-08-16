import { useState } from 'react';
const UserProfile = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleSave = () => {
    // Handle saving the user profile data
    // You can send an API request or perform any necessary actions here
    console.log('Saving profile...');
  };

  const handleCancel = () => {
    // Handle canceling changes
    // You might want to reset the form fields to their initial values
    console.log('Canceling changes...');
  };

  const handleDelete = () => {
    // Handle deleting the user profile
    // You can prompt the user for confirmation and send a delete request
    console.log('Deleting profile...');
  };

  return (
    <div className="user-profile">
      <div className="main-profile avatar">
        <img
          className="card"
          style={{
            boxShadow: '0px 0px 20px rgba(225, 215, 172, 0.4)',
          }}
          src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
          alt="User profile picture"
        />
      </div>
      <div className="profile-details">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={handleSurnameChange}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <textarea
          placeholder="Bio/Description"
          value={bio}
          onChange={handleBioChange}
        />
        <div className="button-container">
          <button className="save-button" onClick={handleSave}>Save</button>
          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
          <button className="delete-button" onClick={handleDelete}>Delete Profile</button>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;
