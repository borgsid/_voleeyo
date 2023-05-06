import { useEffect, useState } from "react";
const Friends = ({ activeTab, setActiveTab}) => {
  const [friends, setFriends] = useState([]);
  const [searchFriends, setSearchFriends] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [secretCode, setSecretCode] = useState("");

  useEffect(() => {
    setActiveTab("friends")
    const tryeSecretCode = localStorage.getItem("voleeyo_login");
    if (!tryeSecretCode) {
      window.location.href = "/";
    }
    setSecretCode(tryeSecretCode);

    const fetchData = async () => {
      const dataRaw = await fetch("/api/userFriends", {
        method: "POST",
        body: JSON.stringify({ secretCode: tryeSecretCode }),
      });
      const dataResp = await dataRaw.json();

      if (dataResp.length === 0) {
        setFriends([]);
      } else {
        setFriends(dataResp);
      }
    };
    fetchData();
  }, []);

  const searchFriendsFunc = async (event) => {
    setSearchText(event?.target?.value ?? searchText);
    if (searchText?.trim().length >= 1) {
      var resultRaw = await fetch("/api/searchFriends", {
        method: "POST",
        body: JSON.stringify({ secretCode, searchText }),
      });

      if (resultRaw.status === 200) {
        setSearchFriends(await resultRaw.json());
      }
    }
  };

  const searchButton = () => {
    if (searchText?.trim().length >= 1) {
      searchFriendsFunc();
    }
  };

  const seeFriendNetwork = (friendObj) => {
    window.location.href = `/friendsNetwork?id=${friendObj.id}&userName=${friendObj.name} ${friendObj.surname}`;
  };

  const addNewFriend = async (friendId) => {
    var resp = await fetch("/api/addNewFriend", {
      method: "POST",
      body: JSON.stringify({ secretCode, friendId }),
    });
    if (resp.status === 200) {
      setFriends(await resp.json());
    } else {
      console.log("we couldnt add this friend at this time");
    }
  };
  const toggleNavMenu = () => {
    var navbar = document.getElementById("navbar");
    // if (isVisible) {
    //   navbar.style.display = "none";
    //   setIsNavBarVIsible(false);
    // }
    // else {
    //   navbar.style.display = "unset";
    //   setIsNavBarVIsible(true);
    // }
  }
  return (
    <div className="friends">
      <div className="content-container">
        <div className="content">
          <div className="page-header">
            <h2>Your friends</h2>
            <svg onClick={toggleNavMenu} viewBox="0 0 100 80" width="40" height="40">
              <rect width="100" height="20"></rect>
              <rect y="30" width="100" height="20"></rect>
              <rect y="60" width="100" height="20"></rect>
            </svg>
          </div>
          <hr />
          <div className="friends-cards cards-container">
            {friends.map((friend) => (
              <div className="friend-card" key={friend.id}>
                <div className="card-header">
                  <Image src={friend?.profilePic} alt="Friend profile picture" />
                  <div>
                    <h4>{friend.name} {friend.surname}</h4>
                    <p className="card-subtitle">{friend.email}</p>
                  </div>
                </div>
                <div className="card-body">
                  <button className="friend-btn-network" type="button" onClick={() => { seeFriendNetwork(friend) }}>See Network</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="content">
          <h2>Search for friends</h2>
          <div className="search-bar">
            <input type="text" placeholder="Search friends..." onChange={searchFriendsFunc} />
            <button className="btn-search" onClick={searchButton}>Search</button>
          </div>
          <h3>Search results</h3>
          {/*Search results section */}
          <div className="friends-cards cards-container">
            {searchFriends.map((friend) => (
              <div className="friend-card" key={friend.id}>
                <div className="card-header">
                  <Image src={friend.profilePic} alt="Friend profile picture" />
                  <div>
                    <h4>{friend.name} {friend.surname}</h4>
                    <p className="card-subtitle">{friend.email}</p>
                  </div>
                </div>
                <div className="card-footer">
                  <button className="add-friend-btn" onClick={() => { addNewFriend(friend.id) }}>Add Friend</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );

}
export default Friends;