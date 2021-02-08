//React Standard
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Axios from "axios";

import Menubar from '../component/menubar';

export default class AllAddresses extends React.Component {
 
    ADDRESSAPI = "http://0.0.0.0:8000/rest/get-addresses/"

    state = {
      addresses: [],
    }

    constructor(props) {
      super(props);
      this.interval = 0;
    }

    componentWillMount() {
      try {
        this.interval = setInterval(async() => {
          Axios.get(this.ADDRESSAPI).then(Response => {
            const chuncks = Response.data
            console.log(chuncks)
            this.setState({
              addresses: chuncks,
            })
          }).catch(errors => {
            this.setState({
              addresses: [],
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

    sendaddress(address) {

    }

    render() {
      const {addresses} = this.state
      return (       
          <div className="App">
              <Menubar></Menubar>
              <div style={{marginLeft: '10%', width:'80%', top: '120px', position: 'absolute', zIndex:-20}}>
                <h2 style={{color:'gray'}}>Addressmanagement</h2>
                <hr></hr>
                <h3 style={{color:'#ff5a5a'}} className="float-left">Create a new address</h3>
                <br></br>
                <br></br>
                  Create a new address!
                <hr></hr>
                <h3 style={{color:'#ff5a5a'}} className="float-left">Taken addresses</h3>
                <br></br>
                <br></br>
                <ul class="list-group">
                {
                  addresses < 1 ? 
                  <div class="alert alert-warning">
                    No addresses
                  </div> 
                  :
                    addresses.map(item => (
                      <li class="list-group-item">{item.address}</li>
                    ))
                }
                </ul>
                <br></br>
                <br></br>
              </div>
          </div>
      )
    }
  }