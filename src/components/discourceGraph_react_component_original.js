import cytoscape from "cytoscape";
import cxtmenu from "cytoscape-cxtmenu";
import dagre from "cytoscape-dagre";
import React, { useEffect, useRef, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import popper from "cytoscape-popper";
// import Tippy from '@tippyjs/react';
// import 'tippy.js/dist/tippy.css'; // optional

cytoscape.use(popper);
cytoscape.use(dagre);
cytoscape.use(cxtmenu);

const DiscourceGraph = () => {
  const [elements, setElements] = useState({
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
  })
  const cy = useRef(null);

  useEffect(() => {
    // FIXME: Find a better place to initialize the cxt menu.
    cy.current.cxtmenu({
      selector: "node, edge",
      commands: [
        {
          content: "Edit",
          select: function (ele) {
            console.log("Edit");
          },
        },
        {
          content: "Like",
          select: function (ele) {
            console.log("Like");
          },
          enabled: true,
        },
        {
          content: "Dislike",
          select: function (ele) {
            console.log("Dislike");
          },
          enabled: true,
        },
        {
          content: "Remove",
          select: function (ele) {
            console.log("Remove");
            cy.current.remove(ele)
          },
        },
      ],
    });

    cy.current.cxtmenu({
      selector: "core",
      commands: [
        {
          content: "New Issue",
          select: () =>  { addNewIssue() }
        },
        {
          content: "New Solution",
          select: () => { addNewSolution() }
        },
        {
          content: "New Note",
          select: function () {
            console.log("New Note");
          },
        },
        {
          content: "New Position In Favor",
          select: function () {
            console.log("New Position In Favor");
          },
        },
        {
          content: "New Position Against",
          select: function () {
            console.log("New Position Against");
          },
        },
      ],
    });

    // TODO: Implement the functionality.
    cy.current.on("mouseover", "node", (event) => {
      console.log("Open react-tooltip here.");
      let node = event.target;
      console.log("mouse on node " + node.id());
      console.log("mouse on node " + node.data("label"));
      console.log("mouse on node " + node.data("id"));
    });

    // TODO: Implement the functionality.
    cy.current.on("mouseout", "node", (event) => {
      console.log("Close react-tooltip here.");
    });
  }, [cy]);

  const addNewSolution = () => {
    const newSolution = {
      nodes: [
        { data: { id: "four", label: "soloution4", type: "solution" } },
        { data: { id: "five", label: "solution5", type: "solution" } },
      ],
      edges: [
        {
          data: {
            source: "four",
            target: "two",
          },
        },
        {
          data: {
            source: "five",
            target: "two",
          },
        },
      ],
    };
    cy.current.add(newSolution);
    let layout = cy.current.layout({ name: "dagre", rankDir: "BT" });
    layout.run();
  };

  const addNewIssue = () => {
    const newIssue = {
      nodes: [
        { data: { id: "four", label: "issue 2", type: "issue" } },
      ],
    };
    cy.current.add(newIssue);
    let layout = cy.current.layout({ name: "dagre", rankDir: "BT" });
    layout.run();
  };


  // FIXME: Retrieve elements from back-end.
  // const elements = {
  //   nodes: [
  //     { data: { id: "one", label: "issue", type: "issue" } },
  //     { data: { id: "two", label: "solution1", type: "solution" } },
  //     { data: { id: "three", label: "solution2", type: "solution" } },
  //   ],
  //   edges: [
  //     {
  //       data: {
  //         source: "two",
  //         target: "one",
  //       },
  //     },
  //     {
  //       data: {
  //         source: "three",
  //         target: "one",
  //       },
  //     },
  //   ],
  // };

  // FIXME: Retrieve stylesheet from back-end.
  const stylesheet = [
    {
      selector: "node",
      style: {
        content: "data(label)",
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
  ];

  let layout = { name: "dagre", rankDir: "BT" };
  const style = { width: "auto", height: "600px", borderStyle: "solid" };

  return (
    <div>
    <CytoscapeComponent
      elements={CytoscapeComponent.normalizeElements(elements)}
      style={style}
      layout={layout}
      boxSelectionEnabled={false}
      autounselectify={true}
      stylesheet={stylesheet}
      cy={(ref) => (cy.current = ref)}
      />
      {console.log(`Elements are: ${elements}`)}
      </div>
  );
};

export default DiscourceGraph;
