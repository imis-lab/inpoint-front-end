import React, { useEffect, useRef, useCallback, useReducer } from "react";
import cytoscape from "cytoscape";
import cxtmenu from "cytoscape-cxtmenu";
import dagre from "cytoscape-dagre";
import CytoscapeComponent from "react-cytoscapejs";

cytoscape.use(dagre);
cytoscape.use(cxtmenu);

const DiscourceGraph = () => {
  const cyRef = useRef();

  useEffect(() => {
    const config = {
      container: cyRef.current,
      elements: {
        nodes: [
          { data: { id: "one", label: "issue", type: "issue" } },
          { data: { id: "two", label: "solution1", type: "solution" } },
          { data: { id: "three", label: "solution2", type: "solution" } },
        ],
        edges: [
          {
            data: {
              source: "two",
              target: "one",
            },
          },
          {
            data: {
              source: "three",
              target: "one",
            },
          },
        ],
      },
      stylesheet: [
        {
          selector: "node",
          sytle: {
            "font-size": "12pt",
          },
        },
        {
          selector: "edge",
          style: {
            width: 3,
            "curve-style": "bezier",
            "target-arrow-shape": "triangle",
          },
        },
        {
          selector: 'edge[type="neutral"]',
          style: {
            "line-color": "gray",
            "target-arrow-color": "gray",
          },
        },
        {
          selector: 'edge[type="neutral-note"]',
          style: {
            "line-color": "gray",
            "line-style": "dashed",
            "target-arrow-color": "gray",
          },
        },
        {
          selector: 'node[type="solution"]',
          style: {
            "background-color": "yellow",
          },
        },
        {
          selector: 'node[type="issue"]',
          style: {
            "background-color": "blue",
          },
        },
        {
          selector: 'node[type="note"]',
          style: {
            "background-color": "gray",
          },
        },
        {
          selector: 'node[type="position-in-favor"]',
          style: {
            "background-color": "green",
          },
        },
        {
          selector: 'node[type="position-against"]',
          style: {
            "background-color": "red",
          },
        },
      ],
      layout: {
        name: "dagre",
        rankDir: "BT",
      },
    };
    cytoscape(config);
  }, []);
  // const style = { width: "1770px", height: "600px", borderStyle: "solid" };

  return (
    <div
      id="cy"
      style={{
        width: "500px",
        height: "300px",
        borderStyle: "solid",
      }}
    ></div>
  );
};

export default DiscourceGraph;
