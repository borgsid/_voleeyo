import { useEffect, useState } from "react";
import ReactModal from 'react-modal';
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import Loader from "./components/loader"
import binIcon from "../assets/bin-delete-button.svg"
import Image from "next/image";
export default function Notifications({ activeTab, setActiveTab, friendLookUp, setFriendLookUp }) {
  const [notifications, setNotifications] = useState({ inbox: [], sent: [] });
  const svgBin = binIcon;
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setReplyMessage] = useState("");
  const [reply, setReply] = useState("");
  const [isMessagingModalOpen, setIsMessagingModalOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('')
  const [receiverUserId, setReceiverUserId] = useState("");
  const [receiverUserName, setReceiverUserName] = useState("");
  const [activeTabSection, setActiveTabSection] = useState("inbox");
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [hideFilteredList, setHideFilteredList] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useUser();
  useEffect(() => {
    setActiveTab("notifications")
    var userId = friendLookUp?.receiverUserId
    var userName = friendLookUp?.receiverUserName
    if (userName?.length > 0) {
      setReceiverUserId(userId);
      setReceiverUserName(userName);
      setIsMessagingModalOpen(true)
      setActiveTabSection("sent");
    }
    const fetchData = async () => {
      setIsLoading(true)
      const dataRaw = await fetch(`/api/user/Notifications/${user.sub.split("|")[1]}`, {
        method: "post"
      });
      const dataResp = await dataRaw.json();

      if (dataResp.length === 0) {
        setNotifications({});
      } else {
        setNotifications(dataResp);
      }
      setIsLoading(false)
    }

    fetchData();
  }, []);
  const updateMessageStatus = async (e) => {
    await fetch(`/api/user/Notifications/updateMessage/${user.sub.split("|")[1]}`,
      {
        method: "post",
        body: JSON.stringify({ message: e })
      }
    )
  }
  const handleSelectedMessage = async (e) => {
    if (e.userMessage?.length == 0)
      e.userMessage = reply;
    setReplyMessage(e);
    setShowModal(true);
    if (!e.isRead) {
      e.isRead = true;
      await updateMessageStatus(e);
    }
  };
  const deleteMessage = async (cardType, message_id) => {
    setIsDeleting(true);
    var resp = await fetch(`/api/user/Notifications/deleteMessage/${user.sub.split("|")[1]}`, {
      method: "Post",
      body: JSON.stringify(
        {
          id: message_id,
          notificationToWhom: cardType == "inbox" ? "receiver" : "sender"
        }
      )
    })
    if (resp.status == 200) {
      notifications[cardType] = notifications[cardType].filter(x => x.id != message_id);
      setNotifications(notifications)
    }
    setIsDeleting(false);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // handle reply submission logic
    selectedMessage.userMessage = reply;
    await fetch(`/api/user/Notifications/updateMessage/${user.sub.split("|")[1]}`,
      {
        method: "post",
        body: JSON.stringify({ message: selectedMessage })
      })
    setReply("")
    setIsLoading(false)
    setShowModal(false)
  };
  const handleNewMessageClick = () => {
    setActiveTabSection("sent");
    setHideFilteredList(false);
    setIsMessagingModalOpen(true);
  }
  const handleNewMessageSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const myMessage = {
      id: 0,
      isRead: false,
      message: "",
      messageFrom: {
        id: user.sub.split("|")[1],
        name: "",
        surname: document.getElementById("currentUser-name")?.innerText,
        isFollowing: true
      },
      messageTo: {
      },
      userMessage: newMessage,
      isInbox: true
    };

    // handle reply submission logic
    const response = await fetch(`/api/user/Notifications/sendNewMessage/${user.sub.split("|")[1]}`,
      {
        method: "post",
        body: JSON.stringify({ message: myMessage })
      })
    setIsMessagingModalOpen(false)
    clearNewMessageModal();
    if (response.ok) {
      notifications.sent.push((await response.json()).message)
      setNotifications({ ...notifications });
    }
    else
      alert("There was a problem delivering your message, please try again.")
    setIsLoading(false)
  };
  const clearNewMessageModal = () => {
    setFilteredFriends([]);
    setReceiverUserName("");
    setReceiverUserId("");
  }
  const toggleNavMenu = () => {
    var navbar = document.getElementById("navbar");
    // if (isVisible) {
    //   navbar.style.display = "none";
    //   setIsVisible(false);
    // }
    // else {
    //   navbar.style.display = "unset";
    //   setIsVisible(true);
    // }
  }
  const closeAndResetModal = () => {
    setNewMessage("");
    setReply("");
    setShowModal(false)
  }
  const setReceiverName = (e) => {
    setReceiverUserName(e.target?.value);
  }
  const setUserTextInput = (e) => {
    if (e.target?.value?.length > 0)
      setNewMessage(e.target.value)
  }
  const closeNewMessageModal = () => {
    setIsMessagingModalOpen(false);
    clearNewMessageModal();
  }
  const handleFilterFriends = async (e) => {

    if (e.key == "Backspace")
      setHideFilteredList(false);
    if (e.target.value?.length > 1) {
      const searchText = e.target.value.toLowerCase();
      var friendsRaw = await fetch(`/api/search/InAllFriends/${user.sub.split("|")[1]}`,
        {
          method: "POST",
          body: JSON.stringify({ searchText }),
        });
      if (friendsRaw.ok) {
        const filteredFriends = await friendsRaw.json();
        setFilteredFriends(filteredFriends);
      }
    }
  };
  const handleFriendSelect = (friend) => {
    setReceiverUserName(`${friend.name} ${friend.surname}`)
    setReceiverUserId(friend.userId)
    setHideFilteredList(true)
  }
  return (
    activeTab == "notifications" && <div className="notification">
      <div className="notification-content content">
        <div className="page-header">
          <h2 className="friends-header-text">Your messages{
            isLoading
            && <Loader color={'#2c3e50'} />
          }
          </h2>
          <div className="notification-tabs">
            <div
              className={`notification-tab ${activeTabSection === "inbox" ? "active" : ""}`}
              onClick={() => { setActiveTabSection("inbox"); setNotifications({ ...notifications }) }}
            >
              Inbox {notifications.inbox?.length>0?`(${notifications.inbox?.length})`:""}
            </div>
            <div
              className={`notification-tab ${activeTabSection === "sent" ? "active" : ""}`}
              onClick={() => { setActiveTabSection("sent"); setNotifications({ ...notifications }) }}
            >
              Sent {notifications.sent?.length>0?`(${notifications.sent?.length})`:""}
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

            >
              {
                !isDeleting && <div className="delete-icon notification" onClick={() => { deleteMessage(activeTabSection, message.id) }}>
                  <Image alt="delete icon" height={svgBin.height} src={svgBin.src} width={svgBin.width} />
                </div>
              }
              {isDeleting &&
                <div className="delete-icon notification">
                  <Loader />
                </div>
              }

              <div
                key={message.id}
                onClick={() => handleSelectedMessage(message)}
              >
                {/*this is the  inbox section */}
                {activeTabSection == "inbox" && <div className="card-header">
                  <h5>{message.messageFrom.name} {message.messageFrom.surname}</h5>
                  {message.isRead == undefined ?
                    <label><span className="unread-indicator">sending</span></label>
                    : message.isRead ? (
                      <label>{(new Date(message.createdUTC)).toLocaleTimeString()} <span className="read-indicator">Read</span></label>
                    ) : (
                      <label>{(new Date(message.createdUTC)).toLocaleTimeString()} <span className="unread-indicator">Unread</span></label>
                    )}
                </div>
                }
                {/*this is the sent section */}
                {activeTabSection == "sent" && <div className="card-header">
                  <h5>To: {message.messageTo.name} {message.messageTo.surname}</h5>
                  <label>{(new Date(message.createdUTC)).toLocaleTimeString()} <span className="unread-indicator">sent</span></label>
                </div>
                }
                {/*this is the  inbox section */}
                {activeTabSection == "inbox" && <div className="card-body">
                  <p>{message.message}</p>
                  {message.userMessage && (
                    <div className="user-reply">
                      <div className="reply-section">
                        <strong>You replied:</strong>
                        {message.userMessage?.length > 0 && <label>{(new Date(message.editedUTC)).toLocaleTimeString()}</label>}
                      </div>
                      <p>
                        {message.userMessage}
                      </p>
                    </div>
                  )}
                </div>}

                {/*this is the  sent section */}
                {activeTabSection == "sent" && <div className="card-body">
                  <p>You sent:{message.userMessage}</p>
                  {message.userMessage && (
                    <div className="user-reply">
                      <div className="reply-section">
                        <strong> reply:</strong>
                        {message.message?.length > 0 && <label>{(new Date(message.editedUTC)).toLocaleTimeString()}</label>}
                      </div>
                      <p>
                        {message.message}
                      </p>
                    </div>
                  )}
                </div>}
              </div>
            </div>
          ))}
        </div>
        <button className="fab" onClick={handleNewMessageClick}>+</button>
        {showModal && (
          <ReactModal
            className="modal"
            isOpen={true}
            onRequestClose={closeAndResetModal}
            ariaHideApp={false}
          >
            <div className="notifications-modal modal-content">
              <form onSubmit={handleSubmit}>

                {activeTabSection == "inbox" &&
                  <h4>{selectedMessage.messageFrom.name} {selectedMessage.messageFrom.surname}</h4>}
                {activeTabSection == "sent" &&
                  <h4>To:{selectedMessage.messageTo.name} {selectedMessage.messageTo.surname}</h4>}

                {activeTabSection == "inbox" && <p>Message:{selectedMessage.message}</p>}
                {activeTabSection == "sent" && <p>You wrote:{selectedMessage.userMessage}</p>}
                {activeTabSection == "inbox" && selectedMessage.userMessage && (
                  <div className="user-reply">
                    <p>
                      <strong>You replied:</strong> {selectedMessage.userMessage}
                    </p>
                  </div>
                )}

                {activeTabSection == "sent" && selectedMessage.userMessage && (
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
                      value={reply ?? ""}
                      onChange={(e) => setReply(e.target.value)}
                    />
                  </div>
                )}
                <div className="buttons-line">
                  {!selectedMessage.userMessage && !isLoading && (
                    <button type="submit">Send reply</button>
                  )}
                  {isLoading && <Loader color={'#2c3e50'} />}
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
            onRequestClose={() => { setIsMessagingModalOpen(false); setNewMessage("") }}
            ariaHideApp={false}
          >
            <div className="notifications-modal modal-content">

              <div className="modal-header">
                <h3>New Message</h3>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="friend">To:</label>
                  <input autoComplete="off" type="text" id="friend" name="friend" value={receiverUserName} onChange={setReceiverName} onKeyUp={handleFilterFriends} />
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
                  <input hidden disabled type="text" id="idfriend" name="idfriend" value={receiverUserId} />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message:</label>
                  <textarea id="message" name="message" onChange={setUserTextInput}></textarea>
                </div>
              </div>
              <div className="modal-footer">
                {!isLoading && <button type="submit" onClick={handleNewMessageSubmit} className="send-button">Send</button>}
                {isLoading && <Loader color={'#2c3e50'} />}
                <button type="submit" className="cancel-button" onClick={closeNewMessageModal}>Cancel</button>
              </div>
            </div>
          </ReactModal>}
      </div>
    </div>
  );
}
export const getServerSideProps = withPageAuthRequired();