//React Standard
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Sidebar from "react-sidebar";
import { Link } from 'react-router-dom'

//Stylesheets
import './css/menubar.css'

export default class FSidebar extends React.Component {
 
    constructor(props) {
      super(props);
      this.state = {
        sidebarOpen: false
      };
      this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }
  
    onSetSidebarOpen(open) {
      this.setState({ sidebarOpen: open });
    }
    

    render() {
      return (       
          <div style={{width:"100%", height:'70px', position: "absolute", top:"0px", left: "0px", backgroundColor: '#171a21'}}>
            <div class="" style={{zIndex: 10}}>
              <h4 class="title">HMCoin</h4>
            </div>
            <Sidebar
              sidebar={
                <div style={{paddingTop:'25px'}}>
                    <h2 style={{color:'#171a21'}}>HMCoin</h2>
                    <hr></hr>
                    <ul style={{color:'gray', listStyle: "none", paddingLeft:0}}>
                        <li style={{paddingTop:'10px'}}><Link style={{color:'white'}} to="/">Home</Link></li>
                        <li style={{paddingTop:'10px'}}><Link style={{color:'white'}} to="/send">Send Coins</Link></li>
                        <li style={{paddingTop:'10px'}}><Link style={{color:'white'}} to="/transactions">All Transactions</Link></li>
                        <li style={{paddingTop:'10px'}}><Link style={{color:'white'}} to="/#">The Blockchain</Link></li>
                        <li style={{paddingTop:'10px'}}><Link style={{color:'white'}} to="/#">Mining</Link></li>
                    </ul>
                </div>
              }
              open={this.state.sidebarOpen}
              onSetOpen={this.onSetSidebarOpen}
              styles={{ sidebar: { 
                background: "#ff5a5a", 
                zIndex:200, 
                height:"100%", 
                width:300,
                color: "white",
                position:"fixed",
              }
            }}
              pullRight={true}
            >
              <button style={{position:'fixed', top:'10px', right:'30px', borderStyle: "none", fontSize:'30px', backgroundColor: "#171a21", color:'#ff5a5a'}} onClick={() => this.onSetSidebarOpen(true)}>
                &#x2630;
              </button>
            </Sidebar>
          </div>
      )
    }
  }