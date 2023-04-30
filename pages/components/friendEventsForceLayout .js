import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

const FriendEventsForceLayout = ({ data, width, height }) => {
    const svgRef = useRef(null);
    useEffect(() => {
      const width = 600;
      const height = 400;
      const margin = { top: 20, right: 20, bottom: 20, left: 20 };
      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);
  
      svg.selectAll('*').remove(); // Clear SVG element
  
      const simulation = d3.forceSimulation(data.nodes)
        .force('link', d3.forceLink().id(d => d.id).links(data.links))
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width / 2, height / 2));
      const link = svg
        .append('g')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .selectAll('line')
        .data(data.links)
        .join('line')
        .attr('stroke-width', (d) => Math.sqrt(d.value))
        .attr('title', (d) => d.marathonName) // add title attribute to show marathon name on hover
        .attr('data-marathon', (d) => d.marathonName); // add data-marathon attribute to link element
  
      const node = svg.append('g')
        .attr('stroke', '#00000')
        .attr('stroke-width', 1.5)
        .selectAll('g')
        .data(data.nodes,d=> d.id)
        .join('g')
        .attr('class', 'node')
        .attr('id', d => `node-${d.id}`)
        .call(drag(simulation));
  
      node.append('circle')
        .attr('r', 5)
        .attr('fill', d => d.group === 0 ? 'red' : (d.group === 1 ? 'green' : 'blue'));
  
      node.append('text')
        .text(d => d.id)
        .attr('dx', 10)
        .attr('dy', 5);
  
      simulation.on('tick', () => {
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);
        node
          .attr('transform', d => `translate(${d.x},${d.y})`);
      });
  
      function drag(simulation) {
        function dragstarted(event, d) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }
  
        function dragged(event, d) {
          d.fx = event.x;
          d.fy = event.y;
        }
  
        function dragended(event, d) {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }
  
    return d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);
    }
    node.on('click',  handleNodeClick);
      function handleNodeClick(d) {
        // Select all nodes and reset fill color
        d3.selectAll('.node').select('circle').attr('fill', d => d.group === 0 ? 'red' : (d.group === 1 ? 'green' : 'blue'));
      
        // Select relationships for clicked node
        const clickedCircle = d.target.__data__;
        const relationships = data.links.filter(l => l.source.id === clickedCircle.id || l.target.id === clickedCircle.id);
      
        // Set fill color for related nodes
        relationships.forEach(rel => {
          const relatedNodeId = rel.source.id === clickedCircle.id ? rel.target.id : rel.source.id;
          d3.select(`#node-${relatedNodeId}`).select('circle').attr('fill', 'yellow');
          d3.select(`#node-${clickedCircle.id}`).select('circle').attr('fill', 'yellow');
          console.log(`${clickedCircle.id} is connected to ${relatedNodeId} through the ${rel.marathonName}`);
        });
      }
    return () => {
        node.on('click', null);
    }
}, [data]);

return (
    <svg ref={svgRef}></svg>
);
};

export default FriendEventsForceLayout;
