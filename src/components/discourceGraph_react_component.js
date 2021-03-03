import cytoscape from "cytoscape";
import cxtmenu from "cytoscape-cxtmenu";
import dagre from "cytoscape-dagre";
import React, { useEffect, useRef, useState, forwardRef, useCallback } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import _ from "lodash";
import popper from "cytoscape-popper";
import Tippy from "@tippyjs/react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional
import PopUpModal from "./PopUpModal";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import "react-tippy/dist/tippy.css";
import { Tooltip, withTooltip } from "react-tippy";

cytoscape.use(popper);
cytoscape.use(dagre);
cytoscape.use(cxtmenu);

const DiscourceGraph = () => {
  const [node, setNode] = useState("");
  const cyRef = useRef(null);
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
  const [modalInfo, setModalInfo] = useState({ status: false, node: {} });

  useEffect(() => {
    fetch("/api/discourses/ids")
    .then(res => res.json())
    .then(result => {
      console.log(result);
    }).catch(error => console.log(error));

    const cy = cyRef.current;
    cy.cxtmenu({
      selector: "node",
      commands: [
        {
          content: "Edit",
          select: (node) => {
            console.log(node.data());
            console.log("================");
            setModalInfo({ status: true, node: node.data() });
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
          select: function (node) {
            cy.remove(node);
            // saveGraph();
          },
        },
      ],
    });

    cy.cxtmenu({
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
          select: () => {
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
    cy.on("mouseover", "node", (event) => {
      let node = event.target;
      console.log(node.data())
      setNode(node)
      // used only for positioning
      let ref = node.popperRef();
      let dummyDomEle = document.createElement("div");

      //tippy popup
      tippyDiv = new tippy(dummyDomEle, {
        // tippy props:
        getReferenceClientRect: ref.getBoundingClientRect,
        trigger: "manual",
        content: () => createContent(node),
        // content: () => createContentfromHTML(),
        // content: '<p><em>some text</em>Title<br></p>',
        arrow: true,
        placement: "bottom",
        hideOnClick: true,
        multiple: true,
        sticky: true,
        theme: "tomato",
        allowHTML: true
      });

      tippyDiv.show();
    });

    cy.on("mouseout", "node", (event) => {
      tippyDiv.hide();
    });
  }, [cyRef, elements, layout, style]);

  const getID = () => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  const saveGraph = () => {
    // const x = cyRef.current.json();
    // console.log(x.elements);
    // console.log(elements)
    // setElements([...elements, x.elements.nodes[0]])
    // x.elements.nodes.forEach(node => setElements([...elements, node]))

    // positioning new solution
    let layout = cyRef.current.layout({ name: "dagre", rankDir: "BT" });
    layout.run();
  };

  const addNode = (id, text, label, type, author, source, target) => {
    cyRef.current.add([
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
    cyRef.current.add(newIssue);
    let layout = cyRef.current.layout({ name: "dagre", rankDir: "BT" });
    layout.run();
  };
  // const createContentfromHTML = () => {
  //   let div = document.createElement("div");
  //   `
  //       <div>
  //       <h2>Title</h2>
  //       <i>some text</i>
  //     </div>
  //   `
  // }
  // To fix it with a better solution
  const createContent = (node) => {
    let div = document.createElement("div");
    let authorDiv = document.createElement("div");
    let dateDiv = document.createElement("div");
    let dislikesDiv = document.createElement("div");
    let idDiv = document.createElement("div");
    let labelDiv = document.createElement("div");
    let likesDiv = document.createElement("div");
    let textDiv = document.createElement("div");
    let typeDiv = document.createElement("div");
    // const data = node.data();

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
      // text,
      type,
    } = node.data();
let text = '<p><em>some text</em>Title<br></p>'
    authorDiv.textContent = `Author: ${author}`;
    dateDiv.textContent = `Date: ${date}`;
    dislikesDiv.textContent = `Dislikes: ${dislikes}`;
    idDiv.textContent = `ID: ${id}`;
    labelDiv.textContent = `Label: ${label}`;
    likesDiv.textContent = `Likes: ${likes}`;
    // textDiv.textContent = `Text: ${text}`;
    textDiv.innerHTML = `Text: ${text}`;
    typeDiv.textContent = `Type: ${type}`;
    // div.appendChild(authorDiv);
    // div.appendChild(dateDiv);
    // div.appendChild(dislikesDiv);
    // div.appendChild(idDiv);
    // div.appendChild(labelDiv);
    // div.appendChild(likesDiv);
    // div.appendChild(textDiv);
    // div.appendChild(typeDiv);
    div.append(
      authorDiv,
      dateDiv,
      dislikesDiv,
      idDiv,
      labelDiv,
      likesDiv,
      textDiv,
      typeDiv
    );
    return div;
  };

  const closeModal = (node) => {
    console.log(node);
    setModalInfo({ status: false, node: {} });

    // let temp = cyRef.current.filter('node[id="' + node.id + '"]');
    // temp.data("label", node.label);

    // Fix it: If you remove one of the data the update still happening(?!)
    // cyRef.current
    //   .filter('node[id="' + node.id + '"]')
    //   .data({ text: node.text });
    cyRef.current.data({});
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
        cy={(cy) => (cyRef.current = cy)}
      />
      <Tippy content={<span>Tooltip</span>}>
      <button>My button</button>
    </Tippy>
      {elements.map((ele, idx) => (
        <div key={idx}>{ele.data.id}</div>
      ))}
      <PopUpModal
        modalInfo={modalInfo.status}
        closeModal={closeModal}
        node={modalInfo.node}
      />
      {console.log(node)}
    </div>
  );
};

export default DiscourceGraph;


// <Tooltip
// // options
// title="Welcome to React"
// position="bottom"
// trigger="click"
// >
// <p>Click here to show popup</p>
// </Tooltip>