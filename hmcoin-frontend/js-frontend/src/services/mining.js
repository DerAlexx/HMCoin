//React Standard
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Axios from "axios";
import axios from 'axios';

import Menubar from '../component/menubar';

export default class Mining extends React.Component {
 
  BLOCKCHAINAPI = "http://0.0.0.0:8000/rest/mining/"

  state = {
    pof: [],
  }

  constructor(props) {
    super(props);
    this.interval = 0;
  }

  componentWillMount() {
    try {
      this.interval = setInterval(async() => {
        Axios.get(this.BLOCKCHAINAPI).then(Response => {
          const chuncks = Response.data
          console.log(chuncks)
          this.setState({
            pof: chuncks,
          })
        }).catch(errors => {
          this.setState({
            pof: [],
          })
        })
      }, 1000)
    } catch (exception) {
      console.log(exception)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

    render() {
      const {pof} = this.state
      return (       
          <div className="App">
              <Menubar></Menubar>
              <div style={{marginLeft: '10%', width:'80%', top: '120px', position: 'absolute', zIndex:-20}}>
                <h2 style={{color:'gray'}}>Mining</h2>
                <hr></hr>
                <h3 style={{color:'#ff5a5a'}} className="float-left">Mining</h3>
                <br></br>
                <br></br>
                <ul class="list-group">
                {
                  pof.id
                }
                </ul>
              </div>
          </div>
      )
    }
  }