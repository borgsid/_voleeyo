import { useEffect,useState } from "react";
import ReactModal from 'react-modal';
import NavMenu from "./components/NavMenu";
const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("notifications");
    const [notifications, setNotifications] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMessage, setReplyMessage] = useState("");
    const [reply, setReply] = useState("");
    const [isMessagingModalOpen, SetIsMessagingModalOpen] = useState(false);
    const [newMessage,SetNewMessage] = useState('')
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const secretCode = localStorage.getItem("voleeyo_login");
        if (!secretCode) {
          location.href = "/";
          return;
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
      const toggleNavMenu= ()=>{
        console.log("im clicked")
        var navbar=document.getElementById("navbar");
        if(isVisible)
        {
            navbar.style.display="none";
            setIsVisible(false);
        }
        else{
            navbar.style.display="unset";
            setIsVisible(true);
        }
      }
      return (
        <div className="notification">
          <NavMenu activeTab={activeTab} setActiveTab={setActiveTab}/>
          <div className="notification-content content">
             <div className="page-header">
              <h2>Your messages</h2>
              <svg onClick={toggleNavMenu} viewBox="0 0 100 80" width="40" height="40">
                      <rect width="100" height="20"></rect>
                      <rect y="30" width="100" height="20"></rect>
                      <rect y="60" width="100" height="20"></rect>
                </svg>
             </div>
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
                  <button type="submit" className="send-button">Send</button>
                  <button  type="submit" className="cancel-button" onClick={() => SetIsMessagingModalOpen(false)}>Cancel</button>
                </div>
                </div>
                </ReactModal> }
              </div>
        </div>
      );
}
export default Dashboard;