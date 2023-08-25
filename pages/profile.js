import React, { useState, useEffect } from 'react';
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import Loader from "./components/loader"
import pencil from "../assets/pencil-edit-button.svg";
export default function UserProfile({setActiveTab}) {
  const { user } = useUser()
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [email, setEmail] = useState(null);
  const [bio, setBio] = useState(null);
  const [vUid, setVuid] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);
  const [isTCAccepted, setIsTCAccepted] = useState(false);
  const [usersNames, setUsersNames] = useState(null)
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

  const handleCheckboxChange = (e) => {
    if(e.target.value=='on')
      e.target.value='off'
    else
      e.target.value='on'
    setIsTCAccepted(e.target.value);
  };
  async function handleSave() {
    setIsSaving(true);
    setDisableButtons(true);
    var userId = user.sub.split("|")[1];
    var operation= vUid?`update`:`save`;
    var respRaw = await fetch(`/api/user/userProfileSettings/${operation}/${userId}`, {
      method: 'post',
      body: JSON.stringify({
        v_uid:vUid,
        surname,
        name,
        bio,
        userId,
        isActive:isTCAccepted=='on'
      })
    });
    if (respRaw.status !== 200)
      alert("Error during data save");
    else{
      setActiveTab('dashboard')
      // setIsSaving(false);
      // setDisableButtons(false);
    }
  };

  function handleCancel() {
    setActiveTab('dashboard')
  };

  function handleDelete() {
    setIsDeleting(true)
    setDisableButtons(true);
  };

  useEffect(() => {
    const setUserValues = async () => {
      var respRaw = await fetch(`/api/user/userProfileSettings/user/${user.sub.split("|")[1]}`);
      
      if (respRaw.status === 200) {
        var currentUser = await respRaw.json();
        console.log("currentUser",currentUser)
        setName(currentUser.name??"");
        setSurname(currentUser.surname??"");
        setUsersNames(`${currentUser.name} ${currentUser.surname}`);
        setBio(currentUser.bio??"");
        setVuid(currentUser.v_uid)
        setIsTCAccepted(currentUser.isActive?'on':'off')
      }
    }

    setUserValues();
    setActiveTab('profile')
  }, []);

  
  return (
    <div className="profile-margin">
      <center>{
        !usersNames&&<Loader color={'#2c3e50'}/>
        }
      <h2>Hi {usersNames}, here you can change your personal info{email ? " eccept for your email" : ""}. </h2>
      </center>
      <div className="user-profile">

        <div className="main-profile avatar">
          <img
            className=" profile-img"
            src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
            alt="User profile picture"
          />
        </div>
        {/* <img className="edit-prifile"
          style={{ alignSelf: 'start' }}
          src={svgPencil.src} width={svgPencil.width} height={svgPencil.height} /> */}
        <div className="profile-details">
          <input
            type="text"
            placeholder="Name"
            defaultValue={name}
            onChange={handleNameChange}
          />
          <input
            type="text"
            placeholder="Surname"
            defaultValue={surname}
            onChange={handleSurnameChange}
          />
          {
            email && <input
              readOnly
              disabled
              type="email"
              placeholder="Email"
              defaultValue={email}
            />
          }
          <textarea
            placeholder="Bio/Description"
            defaultValue={bio}
            onChange={handleBioChange}
          />
          <div className='privacy-sector'>
          <input onChange={handleCheckboxChange} onClick={handleCheckboxChange} defaultValue={isTCAccepted} checked={isTCAccepted=='on'} id="privacy-checkbox"type="checkbox" />
          <label > I Accept the <a className='text-links' onClick={()=>{setActiveTab('privacy')}}>terms and conditions</a></label>
          </div>
          <div className="button-container">
            {
              isSaving
                ? <Loader />
                : <button className="save-button" disabled={disableButtons} onClick={handleSave}>Save</button>
            }
            {
              isCanceling
                ? <Loader color={'#2c3e50'} />
                : <button className="cancel-button" disabled={disableButtons} onClick={handleCancel} >Cancel</button>
            }
            {/* TODO {
              isDeleting
                ? <Loader color={'grey'} />
                : <button className="delete-button" disabled={disableButtons} onClick={handleDelete} >Delete Profile</button>
            } */}
          </div>

        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired();