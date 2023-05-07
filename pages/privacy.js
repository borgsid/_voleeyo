import { useState, useEffect } from 'react';

const Privacy = ({ hideNav, setHideNav, activeTab, setActiveTab, secretCode, setSecretCode }) => {
    const [consent, setConsent] = useState(true);
    const [showDelete, setShowDelete] = useState(false);
    const removeData = async () => {

        var resp = await fetch("/api/userPrivacySettings", {
            method: "post",
            body: JSON.stringify({
                secretCode
            })
        });

        var text = await resp.json();
        if (resp.ok) {
            alert(text)
            return true
        }
        else
        {
            alert(text)
            return false;
        }

    }
    const handleDeleteData = async () => {
        if (await removeData()) {
            localStorage.removeItem("voleeyo_login");
            setHideNav(true)
            setConsent(false);
        }
    }
    useEffect(() => {
        const runcheck = async () => {
            try {
                const response = await fetch('/api/checkSecret', {
                    method: 'POST',
                    body: JSON.stringify({ secretCode }),
                });
                const { status } = await response.json();
                if (status) {
                    // setSecretCode(tempValue)
                    setShowDelete(true)
                    // localStorage.setItem('voleeyo_login', tempValue);
                } else alert('Incorrect secret code, please try again.');
            } catch (error) {
                console.error(error);
                alert('An error occurred, please try again later.');
            }
        }
        setActiveTab("privacy")
        // var tempValue= localStorage.getItem("voleeyo_login");

        if (secretCode)
            runcheck();
    }, [secretCode])

    return (
        <div className="privacy-container">
            {consent ? (
                <p>
                    By using the website of Voleeyo, you accept to be tracked across the site. <br />
                    The data you input will be used solely for matching with other users.<br />
                    By continuing to do so, you automatically accept the terms and conditions. <br />
                    You may remove your consent at any time in the accounts section{showDelete ? 'by clicking "Delete data"' : ''}.
                </p>
            ) : (
                <p>Your data has been deleted.</p>
            )}
            {showDelete && <button className="delete-data-button" onClick={handleDeleteData}>Delete data</button>}

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
export default Privacy;