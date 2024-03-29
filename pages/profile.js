import React, { useState, useEffect } from 'react';
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import Loader from "./components/loader";
import pencil from "../assets/pencil-edit-button.svg";

export default function UserProfile({ setActiveTab }) {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [vUid, setVuid] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);
  const [isTCAccepted, setIsTCAccepted] = useState(false);
  const [usersNames, setUsersNames] = useState("");
  const svgPencil = pencil;

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCheckboxChange = () => {
    setIsTCAccepted((prevValue) => !prevValue);
  };


  const handleSave = async () => {
    if (email?.length != 0 && checkEmailValidity()) {

      setIsSaving(true);
      setDisableButtons(true);
      const userId = user.sub.split("|")[1];
      const operation = vUid ? "update" : "save";
      const respRaw = await fetch(`/api/user/userProfileSettings/${operation}/${userId}`, {
        method: 'post',
        body: JSON.stringify({
          v_uid: vUid,
          email,
          surname,
          name,
          bio,
          userId,
          isActive: isTCAccepted,
        }),
      });

      if (respRaw.status !== 200) {
        alert("Error during data save");
      } else {
        setActiveTab('dashboard');
      }

      setIsSaving(false);
      setDisableButtons(false);
    }
    else
      alert("Email is Required")
  };

  function checkEmailValidity(){
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!emailRegex.test(email))
      alert("Use a valid email format");
    return emailRegex.test(email);
  }

  useEffect(() => {
    const setUserValues = async () => {
      const respRaw = await fetch(`/api/user/userProfileSettings/user/${user.sub.split("|")[1]}`);
      
      if (respRaw.status === 200) {
        const currentUser = await respRaw.json();
        setName(currentUser.name || "");
        setSurname(currentUser.surname || "");
        setUsersNames(`${currentUser.name} ${currentUser.surname}`);
        setBio(currentUser.bio || "");
        setEmail(currentUser.email || "");
        setVuid(currentUser.v_uid);
        setIsTCAccepted(currentUser.isActive);
      }
      else
        setUsersNames(" ")
    };

    setUserValues();
    setActiveTab('profile');
  }, []);

  return (
    <div className="profile-margin">
      <center>
        {!usersNames && <Loader color={'#2c3e50'} />}
        <h2>Hi {usersNames}, here you can change your personal info.</h2>
      </center>
      <div className="user-profile">
        <div className="main-profile avatar">
          <img
            className=" profile-img"
            src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
            alt="User profile"
          />
        </div>
        {/* <img className="edit-prifile"
          style={{ alignSelf: 'start' }}
          src={svgPencil.src} width={svgPencil.width} height={svgPencil.height} /> */}
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
            required
            placeholder="Email to receive notifications from followers"
            value={email}
            onChange={handleEmailChange}
          />
          <textarea
            placeholder="Bio/Description"
            value={bio}
            onChange={handleBioChange}
          />
          <div className='privacy-sector'>
            <input
              type="checkbox"
              checked={isTCAccepted}
              id="privacy-checkbox"
              onChange={handleCheckboxChange}
            />
            <span>
              I Accept the <a className='text-links' onClick={() => { setActiveTab('privacy') }}>terms and conditions</a>, emails sent to you from friends will be sent through Voleeyo and vice versa.
            </span>
          </div>
          <div className="button-container">
            {isSaving ? <Loader /> : (
              <button
                className="save-button"
                disabled={disableButtons}
                onClick={handleSave}
              >
                Save
              </button>
            )}
            <button
              className="delete-button"
              disabled={disableButtons}
              onClick={() => { setActiveTab("privacy") }}
            >
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
