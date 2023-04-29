import { useEffect,useState } from "react";
const Frineds = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [surname, setSurname] = useState('');
    const [activeTab, setActiveTab] = useState("friends");
    const [friends,setFriends]= useState([]);
    const [searchFriends, setSearchFriends] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [secretCode, setSecretCode]= useState("");
    
    const handleTabClick = (tab) => {
        location.href=`/${tab}`
        setActiveTab(tab);
    };
    const handleLogout = () => {
      setSecretCode(null);
        localStorage.removeItem("voleeyo_login");
        location.href="/";
    };

    useEffect(() => {
        const tryeSecretCode = localStorage.getItem("voleeyo_login");
        if (!tryeSecretCode) {
          location.href = "/"; 
        }
        setSecretCode(tryeSecretCode);
        const getUserData = async ()=> {
            const response = await fetch("/api/checkSecret", {
                method: "POST",
                body: JSON.stringify({ secretCode:tryeSecretCode}),
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
            const dataRaw = await fetch("/api/userFriends", {
                method: "POST",
                body: JSON.stringify({ secretCode:tryeSecretCode }),
            });
            const dataResp=await dataRaw.json();
      
            if (dataResp.length === 0) {
              setFriends([]);
            } else {
              setFriends(dataResp);
            }
        }
        getUserData();
        fetchData();
      }, []);
    
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
    const searchFriendsFunc= async (event)=>{
      setSearchText(event.target.value)
      if(searchText?.length>=3)
      {
        
        var resultRaw =await fetch("/api/searchFriends", {
          method: "POST",
          body: JSON.stringify({ secretCode,searchText }),
        });

        if (resultRaw.status==200)
          setSearchFriends(await resultRaw.json());
      }
      
    }
    return (
      <div className="friends">
        <div className="navbar" id="navbar">
          <svg onClick={toggleNavMenu} viewBox="0 0 100 80" width="40" height="40">
                    <rect width="100" height="20"></rect>
                    <rect y="30" width="100" height="20"></rect>
                    <rect y="60" width="100" height="20"></rect>
            </svg>
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
                    <img src={friend.profilePic} alt="Friend profile picture" />
                    <div>
                      <h4>{friend.name} {friend.surname}</h4>
                      <p className="card-subtitle">{friend.email}</p>
                    </div>
                  </div>
                  <div className="card-body">
                    <p>{friend.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="content">
            <h2>Search for friends</h2>
            <div className="search-bar">
              <input type="text" placeholder="Search friends..." onChange={searchFriendsFunc}/>
            </div>
            <h3>Search results</h3>
            {/*Search results section */}
            <div className="friends-cards cards-container">
              {searchFriends.map((friend) => (
                <div className="friend-card" key={friend.id}>
                  <div className="card-header">
                    <img src={friend.profilePic} alt="Friend profile picture" />
                    <div>
                      <h4>{friend.name} {friend.surname}</h4>
                      <p className="card-subtitle">{friend.email}</p>
                    </div>
                  </div>
                  <div className="card-body">
                    <p>{friend.bio}</p>
                  </div>
                  <div className="card-footer">
                    <button className="add-friend-btn">Add Friend</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    );
}
export default Frineds;