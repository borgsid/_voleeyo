import { useEffect, useState } from "react";
import * as d3 from 'd3';
import NavMenu from "./components/navMenu";
import FriendEventsForceLayout from "./components/friendEventsForceLayout ";
const FriendsNetwork = () => {
  const [data, setData] = useState(null);
  const [activeNode, setActiveNode] = useState([]);
  const [activeTab, setActiveTab] = useState("friends");
  const [selectedId, setSelectedId] = useState(0);
  const [selectedUserName, setSelectedUserName] = useState("")
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const secretCode = localStorage.getItem("voleeyo_login");
    if (!secretCode) {
      location.href = "/";
      return;
    }
    const fetchData = async () => {
      const dataRaw = await fetch("/api/friendsNetwork", {
        method: "POST",
        body: JSON.stringify({ secretCode }),
      });
      const dataResp = await dataRaw.json();
      if (dataResp != undefined) {
        setData(dataResp);
        d3.selectAll('.node').select('circle').attr('fill', 'red');

      } else {
        setData(null);
      }
    };
    const updateSelectedNode = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const idParam = urlParams.get('id');
      const userName = urlParams.get('userName');

      setSelectedId(idParam);
      setSelectedUserName(userName);
    };
    fetchData();
    updateSelectedNode();
  }, [selectedId]);
  const handleNodeClick = (d) => {
    d3.selectAll('.node').select('circle').attr('fill', 'blue');
    // Select relationships for clicked node
    const clickedCircle = d.target.__data__;
    setSelectedUserName(clickedCircle.userName);
    const relationships = data.links.filter(l => l.source.id === clickedCircle.id || l.target.id === clickedCircle.id);
    // Set fill color for related nodes
    var relText = {
      clickedUser: clickedCircle.userName,
      connections: [],
      isCurrentUser: false,
      userId:clickedCircle.id
    };
    relationships.forEach(rel => {
      const relatedNodeId = rel.source.id === clickedCircle.id ? rel.target.id : rel.source.id;
      d3.select(`#node-${relatedNodeId}`).select('circle').attr('fill', 'yellow');
      d3.select(`#node-${clickedCircle.id}`).select('circle').attr('fill', 'yellow');
      if (clickedCircle.id == 1)
        relText.isCurrentUser = true
      relText.connections.push(`- connected to ${data.nodes.find(x => x.id == relatedNodeId).userName} through the: ${rel.eventName}.`);
    });
    setActiveNode(relText);
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
  return (
    <div className="friends frinds-network">
      <NavMenu activeTab={activeTab} setActiveTab={setActiveTab} toggleNavMenu={toggleNavMenu} />
      <div className="constnet-container">
        <div className="content">
          <div className="page-header">
            <h2>Your Friends network</h2>
            <div className="card-header">
              <span>Drag or click on <b>{selectedUserName}</b> to find out how you can start network.</span>
            </div>
            <svg onClick={toggleNavMenu} viewBox="0 0 100 80" width="40" height="40">
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
                  {!activeNode.isCurrentUser && <button type="button" className="friend-network" onClick={() => { location.href = `/notifications?receiverUserId=${activeNode.userId}&receiverUserName=${activeNode.clickedUser}` }}>Contact {activeNode.clickedUser}</button>}
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
export default FriendsNetwork;