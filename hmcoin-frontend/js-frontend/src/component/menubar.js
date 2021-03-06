//React Standard
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import FSidebar from './sidebar';

//Stylesheets
import './css/menubar.css'

export default class Menubar extends React.Component {
    render() {
      return (       
          <div style={{width:"100%", height:'70px', position: "fixed", top:"0px", left: "0px", backgroundColor: '#171a21'}}>
            <div class="" style={{zIndex: 10}}>
              <h4 class="title">HMCoin</h4>
            </div>
            <FSidebar></FSidebar>
          </div>
      )
    }
  }