import { useEffect, useState } from "react";
import Loader from "./components/loader";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from 'next/image';
import binIcon from "../assets/bin-delete-button.svg"

export default function Friends({ activeTab, setActiveTab, friendLookUp, setFriendLookUp }) {
  const { user } = useUser();
  const [friends, setFriends] = useState([]);
  const [searchFriends, setSearchFriends] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isDeleting,setIsDeleting]=useState(false)
  const svgBin=binIcon;
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const dataRaw = await fetch(`/api/user/Friends/${user.sub?.split("|")[1]}`,
        {
          method: "Get"
        });
      const dataResp = await dataRaw.json();

      if (dataResp.length === 0) {
        setFriends([]);
      } else {
        setFriends(dataResp);
      }
      setIsLoading(false)
    };

    fetchData();
  }, [friendLookUp]);

  const searchFriendsFunc = async (event) => {
    setSearchText(event?.target?.value ?? searchText);
    setIsLoadingSearch(true)

    if (searchText?.trim().length >= 3) {
      var resultRaw = await fetch(`/api/search/Friends/${user.sub?.split("|")[1]}`,
        {
          method: "POST",
          body: JSON.stringify({ searchText }),
        });

      if (resultRaw.status === 200) {
        setSearchFriends(await resultRaw.json());
      }
    }
    else
      setSearchFriends([])
    setIsLoadingSearch(false)
  };
  const searchButton = () => {
    if (searchText?.trim().length >= 1) {
      searchFriendsFunc();
    }
  };

  const addNewFriend = async (friendUserId) => {
    setIsLoading(true)
    var resp = await fetch(`/api/friends/addNewFriends/${user.sub.split("|")[1]}`, {
      method: "POST",
      body: JSON.stringify({ friendUserId }),
    });
    if (resp.status === 200) {
      setFriends(await resp.json());
      searchFriends.map((x) => {
        if (x.id == friendUserId)
          x.isFollowing = true;
      })
      setSearchFriends(searchFriends)
    } else {
      alert("we couldnt add this friend at this time");
    }
    setSearchFriends([]);
    setIsLoading(false);
  };

  const removeFriend = async (friendUid) => {
    setIsLoading(true);
    setIsDeleting(true);
    var resp = await fetch(`/api/friends/removeFriends/${user.sub.split("|")[1]}`, {
      method: "POST",
      body: JSON.stringify({ friendUid }),
    });
    if (resp.status === 200) {
      setFriends(await resp.json());
      searchFriends.map((x) => {
        if (x.id == friendUid)
          x.isFollowing = true;
      })
      setSearchFriends(searchFriends)
    } else {
      alert("we couldnt remove this friend at this time");
    }
    setSearchFriends([]);
    setIsDeleting(false);
    setIsLoading(false);
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

    <div className="content-container">
      <div className="content">
        <div className="page-header">
          <h2 className="friends-header-text">Your friends{
            isLoading
            && <Loader color={'#2c3e50'} />
          }
          </h2>
          <svg onClick={toggleNavMenu} viewBox="0 0 100 80" width="40" height="40">
            <rect width="100" height="20"></rect>
            <rect y="30" width="100" height="20"></rect>
            <rect y="60" width="100" height="20"></rect>
          </svg>
        </div>
        <hr />
        <div className="friends-cards cards-container">
          {friends.map((friend, index) => (
            <div className="friend-card" key={friend.id}>
              <div className="card-header">
                <img width="75" height="75" src={friend.profilePic} alt="Friend profile picture" />
                <div>
                  <h4>{friend.name} {friend.surname}</h4>
                  <p className="card-subtitle">{friend.email}</p>
                </div>
              </div>
              <div className="card-body my-friends">
                <button className="friend-btn-network" 
                  type="button" 
                  onClick={() => { setActiveTab("friendsNetwork"); 
                                    setFriendLookUp(friend); }}>See Network</button>
                  {!isDeleting&&<Image 
                  onClick={()=>{removeFriend(friend.f_uid)}}
                  alt="delete icon" height={svgBin.height} src={svgBin.src} width={svgBin.width} />}
                  {isDeleting&&<Loader color={'#2c3e50'}/>}
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
        <h3 className="friends-header-text">Search results
         { isLoadingSearch&&<Loader color={'#2c3e50'}/>}
          </h3>
        {/*Search results section */}
        <div className="friends-cards cards-container">
          {searchFriends.map((friend) => (
            <div className="friend-card" key={friend.id}>
              <div className="card-header">
                <img width="75" height="75" src={friend.profilePic} alt="Friend profile picture" />
                <div>
                  <h4>{friend.name} {friend.surname}</h4>
                  <p className="card-subtitle">{friend.email}</p>
                </div>
              </div>
              <div className="card-footer">
                <button className="add-friend-btn" onClick={() => { addNewFriend(friend.userId) }}>Add Friend</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

};
export const getServerSideProps = withPageAuthRequired();