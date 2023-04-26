import { useEffect,useState } from "react";
import ReactModal from 'react-modal';
import svgPencil from "../assets/pencil-edit-button.svg"
const Dashboard = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [surname, setSurname] = useState('');
    const [activeTab, setActiveTab] = useState("notifications");
    const [notifications, setNotifications] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMessage, setReplyMessage] = useState("");
    const [reply, setReply] = useState("");
    const [isMessagingModalOpen, SetIsMessagingModalOpen] = useState(false);
    const [newMessage,SetNewMessage] = useState('')
    
    const handleTabClick = (tab) => {
        location.href=`/${tab}`
        setActiveTab(tab);
    };
    const handleLogout = () => {
        localStorage.removeItem("voleeyo_login");
        location.href="/";
    };

    useEffect(() => {
        const secretCode = localStorage.getItem("voleeyo_login");
        if (!secretCode) {
          location.href = "/";
          return;
        }
        const getUserData = async ()=> {
            const response = await fetch("/api/checkSecret", {
                method: "POST",
                body: JSON.stringify({ secretCode }),
            });
            const data = await response.json();
            if(data.status){
                const name  =   data.name;
                const  surname  =    data.surname;
                const  email  =   data.email;
                setName(name);
                setSurname(surname);
                setEmail(email);
            }
        }

        const fetchData = async ()=>{
            const dataRaw = await fetch("/api/userNotification", {
                method: "POST",
                body: JSON.stringify({ secretCode }),
            });
            const dataResp=await dataRaw.json();
      
            if (dataResp.length === 0) {
                setNotifications([]);
            } else {
            setNotifications(dataResp);
            }
        }
        getUserData();
        fetchData();
      }, []);
    
      const handleSelectedMessage = (e) => {
        setReplyMessage(e);
        setShowModal(true);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // handle reply submission logic
        setShowModal(false);
      };
      const handleNewMessageClick = () => {
        SetIsMessagingModalOpen(true);
      }
      return (
        <div className="notification">
          <div className="navbar">
            <div className="profile">
              <img
                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
                alt="User profile picture"
              />
              <div>
                <h4>{name} {surname}</h4>
                <p>{email}</p>
              </div>
            </div>
            <div className="tabs">
              <div
                className={`tab ${activeTab === "dashboard" ? "active" : ""}`}
                onClick={() => handleTabClick("dashboard")}
              >
                Dashboard
              </div>
              <div
                className={`tab ${activeTab === "notifications" ? "active" : ""}`}
                onClick={() => handleTabClick("notifications")}
              >
                Notifications
              </div>
              <div
                className={`tab ${activeTab === "friends" ? "active" : ""}`}
                onClick={() => handleTabClick("friends")}
              >
                Friends
              </div>
            </div>
            <div className="logout" onClick={handleLogout}>
              Logout
            </div>
          </div>
          <div className="notification-content content">
            <h2>Your messages</h2>
            <div className="notification-cards cards-container">
              {notifications.map((message) => (
                <div
                  className="notification-card"
                  key={message.id}
                  onClick={() => handleSelectedMessage(message)}
                >
                  <div className="card-header">
                    <h5>{message.messageSender.name} {message.messageSender.surname}</h5>
                    {message.isRead ? (
                      <span className="read-indicator">Read</span>
                    ) : (
                      <span className="unread-indicator">Unread</span>
                    )}
                  </div>
                  <div className="card-body">
                    <p>{message.message}</p>
                    {message.userReply && (
                      <div className="user-reply">
                        <p>
                          <strong>You replied:</strong> {message.userReply}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="fab"onClick={handleNewMessageClick}>+</button>
            {showModal && (
              <ReactModal
                className="modal"
                isOpen={true}
                onRequestClose={() => {setShowModal(false); setReplyMessage(null)}} 
                ariaHideApp={false}
              >
                <div className="notifications-modal modal-content">
                  <form onSubmit={handleSubmit}>
                    <h4>{selectedMessage.messageSender.name} {selectedMessage.messageSender.surname}</h4>
                    <p>Message:{selectedMessage.message}</p>
                    {selectedMessage.userReply && (
                      <div className="user-reply">
                        <p>
                          <strong>You replied:</strong> {selectedMessage.userReply}
                        </p>
                      </div>
                    )}
                    {!selectedMessage.userReply && (
                      <div className="form-group">
                        <label htmlFor="reply">Your reply:</label>
                        <textarea
                          id="reply"
                          name="reply"
                          value={reply}
                          onChange={(e) => setReply(e.target.value)}
                        />
                      </div>
                    )}
                    {!selectedMessage.userReply && (
                      <button type="submit">Send reply</button>
                    )}
                  </form>
                </div>
              </ReactModal>
            )}
            {isMessagingModalOpen && 
              <ReactModal
              className="modal"
              isOpen={true}
              onRequestClose={() => {SetIsMessagingModalOpen(false); SetNewMessage(null)}} 
              ariaHideApp={false}
            >
              <div className="notifications-modal modal-content">

                <div className="modal-header">
                  <h3>New Message</h3>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="friend">To:</label>
                    <input type="text" id="friend" name="friend" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message"></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="send-button">Send</button>
                  <button className="cancel-button" onClick={() => SetIsMessagingModalOpen(false)}>Cancel</button>
                </div>
                </div>
                </ReactModal> }
              </div>
        </div>
      );
}
export default Dashboard;