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
    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink().id(d => d.id).links(data.links))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));
    const link = svg.append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke-width', d => Math.sqrt(d.value));


      

    const node = svg.append('g')
      .attr('stroke', '#00000')
      .attr('stroke-width', 1.5)
      .selectAll('g')
      .data(data.nodes)
      .join('g')
      .call(drag(simulation))
      .on('click', d => {
        var clickedCircle= d.target.__data__;
        var relationships = data.links.filter(l => l.source.id === clickedCircle.id || l.target.id === clickedCircle.id);
        relationships= relationships.filter(j=> j.source.id!=clickedCircle.id)
        console.log(
            `${clickedCircle.id} is connected to ${relationships.map(l => l.source === clickedCircle.id  ? l.target.id  : l.source.id).join(', ')} as they are part of group: ${clickedCircle.group}`);
      });;

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
  }, [data]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default FriendEventsForceLayout;
