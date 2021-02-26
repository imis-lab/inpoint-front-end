import cytoscape from "cytoscape";
import cxtmenu from "cytoscape-cxtmenu";
import dagre from "cytoscape-dagre";
import React, { useEffect, useRef, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import _ from "lodash";
import popper from "cytoscape-popper";
// import Tippy from "@tippyjs/react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional

cytoscape.use(popper);
cytoscape.use(dagre);
cytoscape.use(cxtmenu);

const DiscourceGraph = () => {
  const cy = useRef(null);
  const [elements, setElements] = useState([
    {
      group: "nodes",
      data: {
        id: "parent1",
        label: "issue 1",
        type: "issue",
        text: "textparent",
        author: "authorParent",
        likes: 0,
        dislikes: 0,
        date: new Date(),
      },
    },
    {
      group: "nodes",
      data: {
        id: "two",
        parent: "nparent",
        label: "solution1",
        type: "solution",
        text: "text2",
        author: "author2",
        likes: 0,
        dislikes: 0,
        date: new Date(),
      },
    },
    {
      group: "nodes",
      data: {
        id: "three",
        parent: "nparent",
        label: "solution2",
        type: "solution",
        text: "text3",
        author: "author3",
        likes: 0,
        dislikes: 0,
        date: new Date(),
      },
    },
    {
      data: {
        id: "twoone",
        source: "two",
        target: "parent1",
        label: "edge",
        type: "neutral",
      },
    },
    {
      data: {
        id: "threeone",
        source: "three",
        target: "parent1",
        label: "edge",
        type: "neutral",
      },
    },
  ]);
  const [stylesheet, setStylesheet] = useState([
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
  ]);
  const [layout, setLayout] = useState({ name: "dagre", rankDir: "BT" });
  const [style, setStyle] = useState({
    width: "auto",
    height: "600px",
    borderStyle: "solid",
  });

  useEffect(() => {
    cy.current.cxtmenu({
      selector: "node, edge",
      commands: [
        {
          content: "Edit",
          select: function (ele) {
            // console.log("Edit");
          },
        },
        {
          content: "Like",
          select: function (ele) {
            // console.log("Like");
          },
          enabled: true,
        },
        {
          content: "Dislike",
          select: function (ele) {
            // console.log("Dislike");
          },
          enabled: true,
        },
        {
          content: "Remove",
          select: function (ele) {
            // console.log("Remove");
            cy.current.remove(ele);
          },
        },
      ],
    });

    cy.current.cxtmenu({
      selector: "core",
      commands: [
        {
          content: "New Issue",
          select: () => {
            addNewIssue(getID(), "New solution", "New solution", "sp");
          },
        },
        {
          content: "New Solution",
          select: (x) => {
            addSolutionNode();
            saveGraph();
          },
        },
        {
          content: "New Note",
          select: function () {
            // console.log("New Note");
          },
        },
        {
          content: "New Position In Favor",
          select: function () {
            // console.log("New Position In Favor");
          },
        },
        {
          content: "New Position Against",
          select: function () {
            // console.log("New Position Against");
          },
        },
      ],
    });

    let tippyDiv;
    cy.current.on("mouseover", "node", (event) => {

      let node = event.target;
      console.log(node);
      console.log(elements);
      // used only for positioning
      let ref = node.popperRef();
      let dummyDomEle = document.createElement("div");

      //tippy popup
      tippyDiv = new tippy(dummyDomEle, {
        // tippy props:
        getReferenceClientRect: ref.getBoundingClientRect,
        trigger: "manual",
        content: () => {
          let div = document.createElement("div");
          let authorDiv = document.createElement("div");
          let dateDiv = document.createElement("div");
          let dislikesDiv = document.createElement("div");
          let idDiv = document.createElement("div");
          let labelDiv = document.createElement("div");
          let likesDiv = document.createElement("div");
          let textDiv = document.createElement("div");
          let typeDiv = document.createElement("div");
          // const data = node._private.data;

          // const convertedElements = _.keys(data).map((dataKey) => ({
          //   elementNameProperty: dataKey,
          //   elementValueProperty: data[dataKey],
          // }));
          // console.log(convertedElements);
          const {
            author,
            date,
            dislikes,
            id,
            label,
            likes,
            text,
            type,
          } = node._private.data;

          authorDiv.textContent = author;
          dateDiv.textContent = date;
          dislikesDiv.textContent = dislikes;
          idDiv.textContent = id;
          labelDiv.textContent = label;
          likesDiv.textContent = likes;
          textDiv.textContent = text;
          typeDiv.textContent = type;
          div.appendChild(authorDiv);
          div.appendChild(dateDiv);
          div.appendChild(dislikesDiv);
          div.appendChild(idDiv);
          div.appendChild(labelDiv);
          div.appendChild(likesDiv);
          div.appendChild(textDiv);
          div.appendChild(typeDiv);
          return div;
        },
        arrow: true,
        placement: "bottom",
        hideOnClick: false,
        multiple: true,
        sticky: true,
        theme: "tomato",
      });

      tippyDiv.show();
    });

    cy.current.on("mouseout", "node", (event) => {
      tippyDiv.hide();
    });
  }, [cy, elements, layout, style]);

  const getID = () => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };
  const saveGraph = () => {
    const x = cy.current.json();
    // console.log(x.elements);
    // console.log(elements)
    // setElements([...elements, x.elements.nodes[0]])
    // x.elements.nodes.forEach(node => setElements([...elements, node]))
    let layout = cy.current.layout({ name: "dagre", rankDir: "BT" });
    layout.run();
  };

  const addNode = (id, text, label, type, author, source, target) => {
    cy.current.add([
      {
        data: {
          id: id,
          text: text,
          label: label,
          type: type,
          author: author,
          likes: 0,
          dislikes: 0,
          date: new Date(),
        },
      },
      {
        data: {
          id: getID(),
          label: "edge",
          source: source,
          target: target,
        },
      },
    ]);
  };

  const addSolutionNode = () => {
    // const id = elements.filter((ele) => ele.data.type == "solution").length + 1;
    const id = getID();
    const text = "New_solution_text";
    const label = "New_solution_label";
    const author = "New_solution_author";
    const target = elements.filter((ele) => ele.data.type == "issue")[0].data
      .id;
    const source = id;

    //   const newSolutionNode = {
    //     group: "nodes",
    //     data: {
    //       id: "four",
    //       parent: "nparent",
    //       label: "soloution4",
    //       type: "solution",
    //     },
    //   },
    //     {
    //       data: {
    //         id: "fourone",
    //         source: "four",
    //         target: "parent1",
    //         label: "edge",
    //         type: "neutral",
    //       },
    //     }
    // };
    addNode(id, text, label, "solution", author, source, target);
  };

  const addNewIssue = () => {
    const newIssue = [
      {
        group: "nodes",
        data: { id: "parent2", label: "issue 2", type: "issue" },
      },
    ];
    cy.current.add(newIssue);
    let layout = cy.current.layout({ name: "dagre", rankDir: "BT" });
    layout.run();
  };

  return (
    <div>
      <CytoscapeComponent
        elements={[...elements]}
        style={style}
        layout={layout}
        boxSelectionEnabled={false}
        autounselectify={true}
        stylesheet={stylesheet}
        cy={(ref) => (cy.current = ref)}
      />
      {elements.map((ele, idx) => (
        <div key={idx}>{ele.data.id}</div>
      ))}
    </div>
  );
};

export default DiscourceGraph;
