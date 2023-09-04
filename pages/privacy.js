import { useState, useEffect } from 'react';
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import Loader from "./components/loader";

export default function Privacy() {
  const [consent, setConsent] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [isLoading,SetIsaLoading] = useState(false)
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
    SetIsaLoading(true)
    await removeData()
    handleLogout()
    SetIsaLoading(false)

  }


  return (
    <div className="privacy-container">
      {consent ? (
        <>
          <p>
            By using the website of Voleeyo, you accept to be tracked across the site. <br />
            The data you input will be used solely for matching with other users.<br />
            By continuing to do so, you automatically accept the terms and conditions. <br />
            You may remove your consent at any time in the accounts section {(user ?? false) ? 'by clicking "Delete data"' : ''}.
          </p>
          {/* Terms & Conditions and Terms of Service */}
          <p>
            <strong>Terms & Conditions and Terms of Service</strong><br /><br />
            <em>Terms & Conditions:</em>
            <br /> - Your data will be used solely for matching with other users.
            <br /> - By using the Voleeyo app, you acknowledge that you have read, understood, and agreed to all the terms and conditions outlined above.
            <br /> - You may remove your consent at any time in the accounts section {(user ?? false) ? 'by clicking "Delete data"' : ''}.
            <br /><br />
            <em>Terms of Service:</em>
            <br />1. Tracking and Data Usage:
            <br /> - When you use the Voleeyo app, you agree to be tracked for the purpose of providing you with a better experience.
            <br /> - Your data will be used exclusively for matching you with potential users who share similar interests.
            <br />2. Visibility to Others:
            <br /> - Users who have not accepted the terms and conditions in the profile page will not be visible to other users.
            <br /> - Your information will remain private until you explicitly accept the terms and conditions in your profile settings.
            <br />3. Acceptance of Terms:
            <br /> - By using the app, you agree to the terms and conditions outlined above.
            <br /> - To become visible to others, you must explicitly accept the terms and conditions in your profile page.
            <br />4. Revoking Consent:
            <br /> - You have the right to revoke your consent at any time.
            <br /> - To do so, navigate to the accounts section and click "Delete data."
          </p>
        </>
      ) : (
        <p>Your data has been deleted.</p>
      )}
      {(user && !isLoading) ? (
        <button className="delete-data-button" onClick={handleDeleteData}>Delete data</button>
      ) : (
        user&&<Loader />
      )}
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