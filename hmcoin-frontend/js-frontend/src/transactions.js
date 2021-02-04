//React Standard
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";

//Stylesheets
import './css/menubar.css'

export default class Transactions extends React.Component {
 
    render() {
      return (       
          <div>
              <Menubar></Menubar>
              <div style={{marginLeft: '10%', width:'80%', top: '120px', position: 'absolute'}}>


              </div>
          </div>
      )
    }
  }