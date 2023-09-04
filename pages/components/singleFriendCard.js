import Image from "next/image"
import Loader from "./loader"
const SingleFriendCard = (data) => {

  const { friend } = data;
  const { index } = data;
  const { setActiveTabFunc } = data;
  const { setFriendLookUpFunc } = data;
  const { addNewFriendFunc } = data;
  const { isDeleting } = data;
  const { removeFriendFunc } = data;
  const { svgBin } = data;
  const { isMyFriend } = data;
  const { isAddingFriend } = data;


  if (isMyFriend&&data)
    return <>
      <div className="friend-card" key={index}>
        <div className="card-header">
          <img width="75" height="75" src={friend?.profilePic} alt="Friend profile picture" />
          <div>
            <h4>{friend?.name} {friend?.surname}</h4>
            <p className="card-subtitle">{friend?.email}</p>
          </div>
        </div>
        <div className="card-body my-friends">
          <button className="friend-btn-network"
            type="button"
            onClick={() => {
              setActiveTabFunc("friendsNetwork");
              setFriendLookUpFunc(friend);
            }}>See Network</button>
          {!isDeleting && <Image
            onClick={() => { removeFriendFunc(friend?.f_uid) }}
            alt="delete icon" height={svgBin?.height} src={svgBin?.src} width={svgBin?.width} />}
          {isDeleting && <Loader color={'#2c3e50'} />}
        </div>
      </div>
    </>
  if (!isMyFriend&&data)
    return <>
      <div className="friend-card" key={index}>
        <div className="card-header">
          <img width="75" height="75" src={friend?.profilePic} alt="Friend profile picture" />
          <div>
            <h4>{friend?.name} {friend?.surname}</h4>
            <p className="card-subtitle">{friend?.email}</p>
          </div>
        </div>
        <div className="card-footer">
          {!isAddingFriend ?
            <button className="add-friend-btn" onClick={() => { addNewFriendFunc(friend?.userId) }}>Add Friend</button>
            : <Loader color={'#2c3e50'} />
          }
        </div>
      </div>
    </>
}
export default SingleFriendCard;