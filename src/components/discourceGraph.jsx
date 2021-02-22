import cytoscape from "cytoscape";
import cxtmenu from "cytoscape-cxtmenu";
import dagre from "cytoscape-dagre";
import React, { Component } from "react";
import CytoscapeComponent from "react-cytoscapejs";

cytoscape.use(dagre);
cytoscape.use(cxtmenu);

class DiscourceGraph extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // FIXME: Find a better place to initialize the cxt menu.
    this.cy.cxtmenu({
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
          },
        },
      ],
    });

    this.cy.cxtmenu({
      selector: "core",
      commands: [
        {
          content: "New Issue",
          select: function (event) {
            console.log("New Issue");
          },
        },
        {
          content: "New Note",
          select: function () {
            console.log("New Note");
          },
        },
        {
          content: "New Solution",
          select: function () {
            console.log("New Solution");
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
    this.cy.on("mouseover", "node", (event) => {
      console.log("Open react-tooltip here.");
    });

    // TODO: Implement the functionality.
    this.cy.on("mouseout", "node", (event) => {
      console.log("Close react-tooltip here.");
    });
  }

  render() {
    // FIXME: Retrieve elements from back-end.
    const elements = [
      { data: { id: "one", label: "issue", type: "issue" } },
      { data: { id: "two", label: "solution1", type: "solution" } },
      { data: { id: "three", label: "solution2", type: "solution" } },
      {
        data: {
          source: "two",
          target: "one",
          label: "edge",
          type: "neutral",
        },
      },
      {
        data: {
          source: "three",
          target: "one",
          label: "edge",
          type: "neutral",
        },
      },
    ];

    // FIXME: Retrieve stylesheet from back-end.
    const stylesheet = [
      {
        selector: "node",
        css: {
          content: "data(label)",
          "font-size": "12pt",
        },
      },
      {
        selector: "edge",
        css: {
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

    const layout = { name: "dagre", rankDir: "BT" };
    const style = { width: "1770px", height: "600px", borderStyle: "solid" };

    return (
      <CytoscapeComponent
        elements={elements}
        style={style}
        layout={layout}
        boxSelectionEnabled={false}
        autounselectify={true}
        stylesheet={stylesheet}
        cy={(cy) => (this.cy = cy)}
      />
    );
  }
}

export default DiscourceGraph;
