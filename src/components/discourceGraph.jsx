import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import React, { Component } from "react";
import CytoscapeComponent from "react-cytoscapejs";

cytoscape.use(dagre);

class DiscourceGraph extends Component {
  constructor(props) {
    super(props);
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
      />
    );
  }
}

export default DiscourceGraph;
