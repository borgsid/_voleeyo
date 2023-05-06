import { useEffect, useState } from "react";
import ReactModal from 'react-modal';
const Dashboard = () => {
  const [notifications, setNotifications] = useState({inbox:[],sent:[]});
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setReplyMessage] = useState("");
  const [reply, setReply] = useState("");
  const [isMessagingModalOpen, setIsMessagingModalOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('')
  const [isVisible, setIsVisible] = useState(false);
  const [receiverUserId, setReceiverUserId] = useState("");
  const [receiverUserName, setReceiverUserName] = useState("");
  const [activeTabSection,setActiveTabSection]= useState("inbox");
  const [filteredFriends,setFilteredFriends]=useState([]);
  const [hideFilteredList,setHideFilteredList]=useState(true);

  useEffect(() => {
    const secretCode = localStorage.getItem("voleeyo_login");
    if (!secretCode) {
      location.href = "/";
      return;
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var userId= urlParams.get('receiverUserId');
    var userName= urlParams.get('receiverUserName');
    if(userName?.length>0)
    {
      setReceiverUserId(userId);
      setReceiverUserName(userName);
      setIsMessagingModalOpen(true)
      setActiveTabSection("sent");
    }
    const fetchData = async () => {
      const dataRaw = await fetch("/api/userNotifications", {
        method: "POST",
        body: JSON.stringify({ secretCode }),
      });
      const dataResp = await dataRaw.json();

      if (dataResp.length === 0) {
        setNotifications({});
      } else {
        setNotifications(dataResp);
      }
    }
    
    fetchData();
  }, []);
  const updateMessageStatus=async (e)=>{
    const secretCode = localStorage.getItem("voleeyo_login");
        await fetch("/api/setMeasageRead",
        {
          method:"post",
          body:JSON.stringify({secretCode,message:e})
        }
      )
  }
  const handleSelectedMessage =async (e) => {
    if(e.userMessage?.length==0)
    e.userMessage=reply;
    setReplyMessage(e);
    setShowModal(true);
    if(!e.isRead)
      {
        e.isRead=true;
        await updateMessageStatus(e);
      }
  };

  const handleSubmit = async(e) => {
    const secretCode = localStorage.getItem("voleeyo_login");
    e.preventDefault();
    // handle reply submission logic
    selectedMessage.userMessage=reply;
    await fetch("/api/setMeasageRead",
    {
      method:"post",
      body:JSON.stringify({secretCode,message:selectedMessage})
    })
    setReply(null)
    setShowModal(false)
  };
  const handleNewMessageClick = () => {
    setActiveTabSection("sent");
    setHideFilteredList(false);
    setIsMessagingModalOpen(true);
  }
  const handleNewMessageSubmit = async(e) => {
    const secretCode = localStorage.getItem("voleeyo_login");
    e.preventDefault();
    const myMessage= {
      id: 0,
      isRead:false,
      message:"",
      messageFrom:{/*server gets the logges userinfo*/},
      messageTo:{
        id:receiverUserId, 
        isFollowing:false
      },
      userMessage: newMessage,
      isInbox:true
    };

    notifications.sent.push(myMessage)
    setNotifications({notifications });
    // handle reply submission logic
    const response=await fetch("/api/sendNewMessage",
    {
      method:"post",
      body:JSON.stringify({secretCode,message:myMessage})
    })
    setIsMessagingModalOpen(false)
    clearNewMessageModal();
    if(response.ok)
      {
        notifications.sent.pop()
        notifications.sent.push((await response.json()).message)
        setNotifications({ ...notifications });
      }
    
  };
  const clearNewMessageModal=()=>{
    setFilteredFriends([]);
    setReceiverUserName(null);
    setReceiverUserId(null);
  }
  const toggleNavMenu = () => {
    var navbar = document.getElementById("navbar");
    if (isVisible) {
      navbar.style.display = "none";
      setIsVisible(false);
    }
    else {
      navbar.style.display = "unset";
      setIsVisible(true);
    }
  }
  const closeAndResetModal=()=>{
    setNewMessage("");
    setReply("");
    setShowModal(false)
  }
  const setReceiverName=(e)=>{
      setReceiverUserName(e.target?.value);
  }
  const setUserTextInput=(e)=>{
    if(e.target?.value?.length>0)
      setNewMessage(e.target.value)
  }
  const closeNewMessageModal=()=>{
    setIsMessagingModalOpen(false);
    clearNewMessageModal();
  }
  const handleFilterFriends = async (e) => {

    if(e.key=="Backspace")
      setHideFilteredList(false);
    if(e.target.value?.length>1){
      const secretCode = localStorage.getItem("voleeyo_login");
      const searchText = e.target.value.toLowerCase();
    
      var friendsRaw= await fetch("/api/searchInAllFriends", {
        method: "POST",
        body: JSON.stringify({ secretCode, searchText }),
      });
      if(friendsRaw.ok){
        const filteredFriends =await friendsRaw.json();
        setFilteredFriends(filteredFriends);
      }
    }
  };
  const handleFriendSelect=(friend)=>{
    setReceiverUserName(`${friend.name} ${friend.surname}`)
    setReceiverUserId(friend.id)
    setHideFilteredList(true)
  }
  return (
    <div className="notification">
      <div className="notification-content content">
        <div className="page-header">
          <h2>Your messages</h2>
          <div className="notification-tabs">
              <div
                className={`notification-tab ${activeTabSection === "inbox" ? "active" : ""}`}
                onClick={() => setActiveTabSection("inbox")}
              >
                Inbox
              </div>
              <div
                className={`notification-tab ${activeTabSection === "sent" ? "active" : ""}`}
                onClick={() => setActiveTabSection("sent")}
              >
                Sent
              </div>
          </div>
          <svg onClick={toggleNavMenu} viewBox="0 0 100 80" width="40" height="40">
            <rect width="100" height="20"></rect>
            <rect y="30" width="100" height="20"></rect>
            <rect y="60" width="100" height="20"></rect>
          </svg>
        </div>
        <div className="notification-cards cards-container">
          {notifications[activeTabSection].map((message) => (
            <div
              className="notification-card"
              key={message.id}
              onClick={() => handleSelectedMessage(message)}
            >
              {/*this is the  inbox section */}
              {activeTabSection=="inbox"&&<div className="card-header">
                <h5>{message.messageFrom.name} {message.messageFrom.surname}</h5>
                {message.isRead==undefined ? 
                 <span className="unread-indicator">sending</span>
                  :message.isRead?(
                  <span className="read-indicator">Read</span>
                ) : (
                  <span className="unread-indicator">Unread</span>
                )}
              </div>
              }
              {/*this is the sent section */}
              {activeTabSection=="sent" &&<div className="card-header">
                <h5>To: {message.messageTo.name} {message.messageTo.surname}</h5>
                  {!message.isRead && message.messageFrom?.name?.length==0
                  ? <span className="unread-indicator">sending</span>
                  :!message.isRead && message.messageFrom?.name?.length>0
                  ?<span className="unread-indicator">sent</span>
                  :message.isRead && message.messageFrom?.name?.length
                  ?<span className="read-indicator">Read</span>
                   :<span className="unread-indicator">Unread</span>
                  }
                </div>
              }
              {/*this is the  inbox section */}
              {activeTabSection=="inbox"&&<div className="card-body">
                <p>{message.message}</p>
                {message.userMessage && (
                  <div className="user-reply">
                    <p>
                      <strong>You replied:</strong> {message.userMessage}
                    </p>
                  </div>
                )}
              </div>}
              {/*this is the  sent section */}
              {activeTabSection=="sent"&&<div className="card-body">
                <p>You sent:{message.userMessage}</p>
                {message.userMessage && (
                  <div className="user-reply">
                    <p>
                      <strong>{message?.name} reply:</strong> {message.message}
                    </p>
                  </div>
                )}
              </div>}
            </div>
          ))}
        </div>
        <button className="fab" onClick={handleNewMessageClick}>+</button>
        {showModal && (
          <ReactModal
            className="modal"
            isOpen={true}
            onRequestClose={ closeAndResetModal }
            ariaHideApp={false}
          >
            <div className="notifications-modal modal-content">
              <form onSubmit={handleSubmit}>

                {activeTabSection=="inbox"&&
                <h4>{selectedMessage.messageFrom.name} {selectedMessage.messageFrom.surname}</h4>}
                 {activeTabSection=="sent"&&
                <h4>To:{selectedMessage.messageTo.name} {selectedMessage.messageTo.surname}</h4>}

                {activeTabSection=="inbox"&&<p>Message:{selectedMessage.message}</p>}
                {activeTabSection=="sent"&&<p>You wrote:{selectedMessage.userMessage}</p>}
                {activeTabSection=="inbox"&&selectedMessage.userMessage && (
                  <div className="user-reply">
                    <p>
                      <strong>You replied:</strong> {selectedMessage.userMessage}
                    </p>
                  </div>
                )}

                {activeTabSection=="sent"&&selectedMessage.userMessage && (
                  <div className="user-reply">
                    <p>
                      <strong>reply:</strong> {selectedMessage.message}
                    </p>
                  </div>
                )}
                {!selectedMessage.userMessage && (
                  <div className="form-group">
                    <label htmlFor="reply">Your reply:</label>
                    <textarea
                      id="reply"
                      name="reply"
                      value={reply??""}
                      onChange={(e) => setReply(e.target.value)}
                    />
                  </div>
                )}
              <div className="buttons-line">
                {!selectedMessage.userMessage && (
                  <button type="submit">Send reply</button>
                )}
                <button type="submit" onClick={closeAndResetModal}>Close</button>
              </div>
              </form>
            </div>
          </ReactModal>
        )}
        {isMessagingModalOpen &&
          <ReactModal
            className="modal"
            isOpen={true}
            onRequestClose={() => { setIsMessagingModalOpen(false); setNewMessage(null) }}
            ariaHideApp={false}
          >
            <div className="notifications-modal modal-content">

              <div className="modal-header">
                <h3>New Message</h3>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="friend">To:</label>
                  <input type="text" id="friend" name="friend" value={receiverUserName} onChange={setReceiverName} onKeyUp={handleFilterFriends}/>
                  {!hideFilteredList && filteredFriends.length > 0 ? (
                      <div className="dropdown-list">
                        {filteredFriends.map((friend) => (
                          <div className="dropdown-list-item" key={friend.id} onClick={() => handleFriendSelect(friend)}>
                            {friend.name} {friend.surname}
                          </div>
                        ))}
                      </div>
                    ) : (
                     (!hideFilteredList && <div className="dropdown-no-results">Keep typing to see more results</div>)
                    )}
                  <input hidden disabled type="text" id="idfriend" name="idfriend" value={receiverUserId}/>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message:</label>
                  <textarea id="message" name="message" onChange={setUserTextInput}></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" onClick={handleNewMessageSubmit} className="send-button">Send</button>
                <button type="submit" className="cancel-button" onClick={ closeNewMessageModal}>Cancel</button>
              </div>
            </div>
          </ReactModal>}
      </div>
    </div>
  );
}
export default Dashboard;