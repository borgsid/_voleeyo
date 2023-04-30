import FriendEventsForceLayout from "./components/friendEventsForceLayout ";
const FriendNetwork = () => {
    const data = {
        nodes: [
          { id: 'Alice', group: 0 },
          { id: 'Bob', group: 0 },
          { id: 'Charlie', group: 1 },
          { id: 'Dave', group: 2 },
          { id: 'Eve', group: 3 },
        ],
        links: [
          { source: 'Alice', target: 'Bob', value: 3, marathonName: 'New York City Marathon' },
          { source: 'Alice', target: 'Charlie', value: 2, marathonName: 'Boston Marathon' },
          { source: 'Bob', target: 'Charlie', value: 4, marathonName: 'Chicago Marathon' },
          { source: 'Charlie', target: 'Dave', value: 1, marathonName: 'London Marathon' },
          { source: 'Dave', target: 'Alice', value: 1, marathonName: 'Tokyo Marathon' },
          { source: 'Eve', target: 'Alice', value: 1, marathonName: 'Tokyo Marathon' },
        ],
      };
      
      return (
        <div style={{ textAlign: 'center' }}>
          <h1>Friend Events Force Layout</h1>
          <FriendEventsForceLayout data={data} width={1000} height={1000} />
        </div>
      );
}
export default FriendNetwork;