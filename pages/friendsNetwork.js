import { useEffect,useState } from "react";
import * as d3 from 'd3';
import FriendEventsForceLayout from "./components/friendEventsForceLayout ";
import NavMenu from "./components/NavMenu";
const FriendsNetwork = () => {
    const [data,setData]=useState(null);
    const [activeNode, setActiveNode] = useState([]);
    const [activeTab, setActiveTab] = useState("friends");

    const mookData = { 
         nodes: [
        { id: 'Current User', group: 0 },
        { id: 'Alice', group: 0 },
        { id: 'Bob', group: 0 },
        { id: 'Charlie', group: 1 },
        { id: 'Dave', group: 2 },
        { id: 'Eve', group: 3 },
      ],
      links: [
        { source: 'Alice', target: 'Bob', value: 3, eventName: 'New York City Marathon', yearOfParticipation: 2016 },
        { source: 'Alice', target: 'Charlie', value: 2, eventName: 'Boston Marathon', yearOfParticipation: 2007 },
        { source: 'Bob', target: 'Charlie', value: 4, eventName: 'Chicago Marathon', yearOfParticipation: 2000 },
        { source: 'Charlie', target: 'Dave', value: 1, eventName: 'London Marathon', yearOfParticipation: 2012 },
        { source: 'Dave', target: 'Alice', value: 1, eventName: 'Tokyo Marathon', yearOfParticipation: 2022 },
        { source: 'Eve', target: 'Alice', value: 1, eventName: 'Tokyo Marathon', yearOfParticipation: 2023 },
        { source: 'Current User', target: 'Alice', value: 1, eventName: 'Charity Walk', yearOfParticipation: 2022 },
        { source: 'Current User', target: 'Alice', value: 1, eventName: 'Food Drive', yearOfParticipation: 2022 },
        { source: 'Current User', target: 'Charlie', value: 1, eventName: 'Environmental Cleanup', yearOfParticipation: 2021 },
        { source: 'Current User', target: 'Eve', value: 1, eventName: 'Blood Drive', yearOfParticipation: 2021 },
        { source: 'Current User', target: 'Bob', value: 1, eventName: 'Animal Shelter Volunteer', yearOfParticipation: 2020 },
        { source: 'Current User', target: 'Bob', value: 1, eventName: 'Community Garden', yearOfParticipation: 2020 },
      ]
    };

    useEffect(() => {
        const secretCode = localStorage.getItem("voleeyo_login");
        if (!secretCode) {
            location.href = "/";
            return;
        }
        
        const fetchData = ()=>{
            // const dataRaw = await fetch("/api/friendsNetwork", {
            //     method: "POST",
            //     body: JSON.stringify({ secretCode }),
            // });
            // const dataResp=await dataRaw.json();
            if (mookData!=undefined)
                setData(mookData);
            else
                setData(null);
        }
        fetchData();
    }, []);
   

    const handleNodeClick=(d)=> {
    // Select all nodes and reset fill color
    d3.selectAll('.node').select('circle').attr('fill', 'blue');
    
    // Select relationships for clicked node
    const clickedCircle = d.target.__data__;
    const relationships = data.links.filter(l => l.source.id === clickedCircle.id || l.target.id === clickedCircle.id);
    
    // Set fill color for related nodes
    var relText ={  clickedUser:clickedCircle.id,
                    connections:[]
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
                Drag, click and find out how you can network with your friends
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
                <button type="button" className="friend-network" onClick={()=>{location.href="/notifications"}}>Contact {activeNode.clickedUser}</button>
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
               