import { useState, useEffect } from 'react';
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
export default function Privacy() {
  const [consent, setConsent] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const { user } = useUser();
  const removeData = async () => {

    var resp = await fetch(`/api/user/userProfileSettings/privacy/${user.sub.split("|")[1]}`,
      {
        method: "get"
      });

    var text = await resp.json();
    if (resp.ok) {
      alert(text)
      return true
    }
    else {
      alert(text)
      return false;
    }

  }
  const handleLogout = () => {
    location.href = "/api/auth/logout";
  };
  const handleDeleteData = async () => {
    await removeData()
    handleLogout()
  }


  return (
    <div className="privacy-container">
      {consent ? (
        <p>
          By using the website of Voleeyo, you accept to be tracked across the site. <br />
          The data you input will be used solely for matching with other users.<br />
          By continuing to do so, you automatically accept the terms and conditions. <br />
          You may remove your consent at any time in the accounts section{(user ?? false) ? 'by clicking "Delete data"' : ''}.
        </p>
      ) : (
        <p>Your data has been deleted.</p>
      )}
      {(user ?? false) && <button className="delete-data-button" onClick={handleDeleteData}>Delete data</button>}

      <style jsx>{`
          .privacy-container {
            border: 1px solid #ddd;
            padding: 20px;
            margin: 20px;
            border-radius: 8px;
          }
          
          p {
            font-size: 16px;
            margin-bottom: 10px;
          }
          
          .delete-data-button {
            background-color: #ff4f4f;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 8px 12px;
            font-size: 14px;
            cursor: pointer;
            transition: background-color 0.2s ease-in-out;
          }
          
          .delete-data-button:hover {
            background-color: #d43d3d;
          }
        `}</style>
    </div>
  );
}
export const getServerSideProps = withPageAuthRequired();