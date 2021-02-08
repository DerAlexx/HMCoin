//React Standard
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";

import Menubar from '../component/menubar';

export default class AllAddresses extends React.Component {
 
    render() {
      return (       
          <div className="App">
              <Menubar></Menubar>
              <div style={{marginLeft: '10%', width:'80%', top: '120px', position: 'absolute', zIndex:-20}}>
                <h2 style={{color:'gray'}}>All available addresses</h2>
                <hr></hr>
              </div>
          </div>
      )
    }
  }