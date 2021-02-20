import React, { Component } from 'react';
import CytoscapeComponent from "react-cytoscapejs";

class DiscourceGraph extends Component {
    constructor(props){
        super(props);
      }

      render(){
        const elements = [
           { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
           { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
           { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
        ];
    
        return (<CytoscapeComponent elements={elements} style={ { width: '1500px', height: '600px' } } />);
      }
}
 
export default DiscourceGraph;