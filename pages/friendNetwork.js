import FriendEventsForceLayout from "./components/friendEventsForceLayout ";
const FriendNetwork = () => {
    const data = {
        nodes: [
          { id: 'Alice', group: 0 },
          { id: 'Bob', group: 0 },
          { id: 'Charlie', group: 1 },
          { id: 'Dave', group: 2 },
          { id: 'Eve', group: 2 }
        ],
        links: [
          { source: 'Alice', target: 'Bob', value: 1 },
          { source: 'Alice', target: 'Charlie', value: 2 },
          { source: 'Bob', target: 'Charlie', value: 1 },
          { source: 'Charlie', target: 'Dave', value: 2 },
          { source: 'Charlie', target: 'Eve', value: 1 },
          { source: 'Dave', target: 'Eve', value: 2 }
        ]
      };
    
      return (
        <div style={{ textAlign: 'center' }}>
          <h1>Friend Events Force Layout</h1>
          <FriendEventsForceLayout data={data} width={1000} height={1000} />
        </div>
      );
}
export default FriendNetwork;