import { useEffect,useState } from "react";
import * as d3 from 'd3';
import FriendEventsForceLayout from "./friendEventsForceLayout ";
import NavMenu from "./navMenu";
const FriendsNetwork = () => {
    const [data,setData]=useState(null);
    const [activeNode, setActiveNode] = useState([]);
    const [activeTab, setActiveTab] = useState("friends");
    const [selectedId,setSelectedId] =useState(0);
    const [selectedUserName,setSelectedUserName]=useState("")

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
            // const node = d3.select(`#node-${idParam}`);
            // console.log("node",node)
            // // if (node) {
            // //   handleNodeClick(node);
            // // }
          };
        fetchData();
        updateSelectedNode();
      }, [selectedId]);
   
    const handleNodeClick=(d)=> {
        // Select all nodes and reset fill color
        // d3.selectAll('.node').select('circle').attr('fill', d => d.group === 0 ? 'blue' : (d.group === 1 ? 'green' : 'red'));
        console.log("setSelectedId",selectedId)
        d3.selectAll('.node').select('circle').attr('fill', 'blue');

        // Select relationships for clicked node
        const clickedCircle = d.target.__data__;
        const relationships = data.links.filter(l => l.source.id === clickedCircle.id || l.target.id === clickedCircle.id);
        // Set fill color for related nodes
        var relText ={  clickedUser:clickedCircle.userName,
                        connections:[],
                        isCurrentUser:false
                    };
        relationships.forEach(rel => {
            const relatedNodeId = rel.source.id === clickedCircle.id ? rel.target.id : rel.source.id;
            d3.select(`#node-${relatedNodeId}`).select('circle').attr('fill', 'yellow');
            d3.select(`#node-${clickedCircle.id}`).select('circle').attr('fill', 'yellow');
            relText.connections.push(`- connected to ${relatedNodeId} through the ${rel.eventName}.`);
        });
        setActiveNode(relText);
    }
    return (
    <div className="friends-network">
        <NavMenu activeTab={activeTab} setActiveTab={setActiveTab}/>
        <div className="content-container">
        <div className="friends-network-content content">
            <div className="page-header">
            <h2>Your Friends network</h2>
            <div className="card-header">
                <span>Drag or click on <b>{selectedUserName}</b> to find out how you can start network.</span>
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
                    width={900}
                    height={500}
                    onNodeClick={handleNodeClick}
                    selectedId={selectedId}
                />
                )}
            </div>
            <div className="side-banner">
                {activeNode.connections && (
                    <div className="node-info">
                        <h3>{activeNode.clickedUser} is:</h3>
                    {activeNode.connections.map((node, index) => (
                        <h3 key={index}>{node}</h3>
                    ))}
                {!activeNode.isCurrentUser&&<button type="button" className="friend-network" onClick={()=>{location.href="/notifications"}}>Contact {activeNode.clickedUser}</button>}
                </div>
                )}
            </div>
            </div>
        </div>
        </div>
    </div>
    );
}
export default FriendsNetwork;
               