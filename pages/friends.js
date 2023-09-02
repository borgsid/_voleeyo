import { useEffect, useState } from "react";
import Loader from "./components/loader";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from 'next/image';
import binIcon from "../assets/bin-delete-button.svg"
import SingleFriendCard from "./components/singleFriendCard";

export default function Friends({ activeTab, setActiveTab, friendLookUp, setFriendLookUp }) {
  const { user } = useUser();
  const [friends, setFriends] = useState([]);
  const [searchFriends, setSearchFriends] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false)
  const [isAddingFriend, setIsAddingFriend] = useState(false);
  const [activeTabSection, setActiveTabSection] = useState("following");
  const svgBin = binIcon;
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

    if (searchText?.trim().length > 2) {
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
    setIsAddingFriend(true)
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
    setIsAddingFriend(false);
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
  return (


    <div className="notification">
      <div className="notification-content content">
        <div className="page-header">
          <h2 className="friends-header-text">Your friends{
            isLoading
            && <Loader color={'#2c3e50'} />
          }
          </h2>
          <div className="notification-tabs">
            <div
              className={`notification-tab ${activeTabSection === "following" ? "active" : ""}`}
              onClick={() => { setActiveTabSection("following") }}
            >
              Following
            </div>
            <div
              className={`notification-tab ${activeTabSection === "followed" ? "active" : ""}`}
              onClick={() => { setActiveTabSection("followed") }}
            >
              Followed
            </div>
          </div>
        </div>
        {/*this is the  following section */}
        {activeTabSection == "following" && <div className="card-body">
          <div className="friends-cards cards-container">
            {friends.map((friend, index) => (
              <SingleFriendCard
                index={friend?.f_uid}
                friend={friend}
                setActiveTabFunc={setActiveTab}
                setFriendLookUpFunc={setFriendLookUp}
                addNewFriendFunc={() => { return true }}
                removeFriendFunc={removeFriend}
                isDeleting={isDeleting}
                svgBin={svgBin}
                isMyFriend={true}
              />
            ))}
          </div>
        </div>}
        {/*this is the  followed section */}
        {activeTabSection == "followed" && <div className="card-body">
          {/* empty section */}
        </div>}
        {/* <button className="fab" onClick={handleNewMessageClick}>+</button> */}


      </div>
      <div className="notification-content content"
        style={{marginTop:'43px'}}
      >
        <div className="page-header">

        <h2 className="friends-header-text">Search for friends</h2>
        <div className="notification-tabs">
            <div
              className='notification-tab'
            >
            </div>
          </div>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Search friends..." onChange={searchFriendsFunc} />
          <button className="btn-search" onClick={searchButton}>Search</button>
        </div>
        <h3 className="friends-header-text">Search results
          {isLoadingSearch && <Loader color={'#2c3e50'} />}
        </h3>
        {/*Search results section */}
        <div className="friends-cards cards-container">
          {searchFriends.map((friend, index) => (
            <SingleFriendCard
              index={friend?.f_uid}
              friend={friend}
              setActiveTabFunc={() => { }}
              setFriendLookUpFunc={() => { }}
              addNewFriendFunc={addNewFriend}
              isDeleting={isDeleting}
              isAddingFriend={isAddingFriend}
              svgBin={svgBin}
              isMyFriend={false}
            />
          ))}
        </div>
      </div>
    </div>
  );

};
export const getServerSideProps = withPageAuthRequired();