import { useEffect, useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import * as d3 from "d3";
import FriendEventsForceLayout from "./components/friendEventsForceLayout ";
import Loader from "./components/loader";

export default function FriendsNetwork({
  setActiveTab,
  friendLookUp,
  setFriendLookUp,
}) {
  const [data, setData] = useState(null);
  const [activeNode, setActiveNode] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [selectedUserName, setSelectedUserName] = useState("");
  const { user } = useUser();
  useEffect(() => {
    const fetchData = async () => {
      const dataRaw = await fetch(
        `/api/friends/Network/${user.sub.split("|")[1]}`,
        {
          method: "Get",
        }
      );
      const dataResp = await dataRaw.json();
      console.log("dataResp",dataResp)
      if (dataResp != undefined) {
        setData(dataResp);
        d3.selectAll(".node").select("circle").attr("fill", "red");
      } else {
        setData(null);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const updateSelectedNode = () => {
      const idParam = friendLookUp.id;
      const userName = `${friendLookUp.name} ${friendLookUp.surname}`;
      setSelectedId(idParam);
      setSelectedUserName(userName);
    };
    updateSelectedNode();
  }, [friendLookUp.id, friendLookUp.name, friendLookUp.surname]);

  const handleNodeClick = (d) => {
    d3.selectAll('.node').select('circle').attr('fill', '#2c3e50');
    // Select relationships for clicked node
    const clickedCircle = d.target.__data__;
    setSelectedUserName(clickedCircle.userName);
    const relationships = data.links.filter(l => l.source.id == clickedCircle.id || l.target.id == clickedCircle.id);
    // Set fill color for related nodes
    console.log("relationships",relationships)
    var relText = {
      clickedUser: clickedCircle.userName,
      connections: [],
      isCurrentUser: false,
      userId: clickedCircle.id
    };
    if (clickedCircle.id == (user.sub.split("|")[1]))
      relText.isCurrentUser = true
    relationships.forEach(rel => {
      const relatedNodeId = rel.source.id === clickedCircle.id ? rel.target.id : rel.source.id;
      d3.select(`#node-${relatedNodeId}`).select('circle').attr('fill', 'rgb(225, 215, 172)');
      d3.select(`#node-${clickedCircle.id}`).select('circle').attr('fill', 'rgb(225, 215, 172)');
      relText.connections.push(`- connected to ${data.nodes.find(x => x.id == relatedNodeId).userName} through the: ${rel.eventName}.`);
    });
    if(relationships.length==0)
      relText.connections.push(`- don't have events in common with anyone at the moment`)
    setActiveNode(relText);
  }
  if (!data) {
    return (<div className="friends frinds-network">
      <div className="constnet-container">
        <div className="content">
          <div className="page-header">
            <h2>Your Friends network</h2>
            <center>
              <Loader />
            </center>
          </div>
        </div>
      </div>
    </div>);
  }

  return (
    <div className="friends frinds-network">
      <div className="constnet-container">
        <div className="content">
          <div className="page-header">
            <h2>Your Friends network</h2>
            <div className="card-header">
              <span>Drag or click on <b>{selectedUserName}</b> to find out how you can start to network.</span>
            </div>
            <svg viewBox="0 0 100 80" width="40" height="40">
              <rect width="100" height="20"></rect>
              <rect y="30" width="100" height="20"></rect>
              <rect y="60" width="100" height="20"></rect>
            </svg>
          </div>
          <div className="friends-network-cards cards-container">
            <div className="network-vis">
              {data && (
                <FriendEventsForceLayout
                  data={data}
                  width={window.innerWidth > 400 ? 500 : 300}
                  height={400}
                  onNodeClick={handleNodeClick}
                  selectedId={selectedId}
                />
              )}
            </div>
            {activeNode.connections && (
              <div className="side-banner">

                <div className="node-info">
                  {!activeNode.isCurrentUser && <h3>{activeNode.clickedUser} is:</h3>}
                  {activeNode.isCurrentUser && <h3>{activeNode.clickedUser} are:</h3>}
                  <hr />
                  {activeNode.connections.map((node, index) => (
                    <span key={index}>{node}</span>
                  ))}
                  {!activeNode.isCurrentUser && <button type="button" className="friend-network" onClick={() => { setActiveTab("notifications"); setFriendLookUp({ receiverUserId: activeNode.userId, receiverUserName: activeNode.clickedUser }) }}>Contact {activeNode.clickedUser}</button>}
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();