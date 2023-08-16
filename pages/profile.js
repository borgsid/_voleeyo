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

  return (
    <div className="user-profile">
      <div className="profile-picture">
        {/* Placeholder for profile picture */}
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
      </div>
    </div>
  );
};

export default UserProfile;
