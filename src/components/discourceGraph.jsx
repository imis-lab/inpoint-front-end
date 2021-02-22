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
    const elements = [
      { data: { id: "one", label: "issue" } },
      { data: { id: "two", label: "solution1" } },
      { data: { id: "three", label: "solution2" } },
      {
        data: {
          source: "one",
          target: "two",
          label: "edge",
        },
      },
      {
        data: {
          source: "one",
          target: "three",
          label: "edge",
        },
      },
    ];

    const layout = { name: "dagre", rankDir: "TB" };

    return (
      <CytoscapeComponent
        elements={elements}
        style={{ width: "1770px", height: "600px", borderStyle: "solid" }}
        layout={layout}
      />
    );
  }
}

export default DiscourceGraph;
