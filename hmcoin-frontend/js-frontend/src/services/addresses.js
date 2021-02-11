//React Standard
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Axios from "axios";
import axios from 'axios';

import Menubar from '../component/menubar';

export default class AllAddresses extends React.Component {
 
    ADDRESSAPI = "http://0.0.0.0:8000/rest/get-addresses/"
    NEWADDRESSAPI = "http://0.0.0.0:8000/rest/new-address/"

    state = {
      addresses: [],
      address: "",
    }

    constructor(props) {
      super(props);
      this.interval = 0;
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.pushAddress = this.pushAddress.bind(this);
    }

    componentDidMount() {
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

    pushAddress(address) {
      axios.post(this.NEWADDRESSAPI,
          JSON.stringify({
            address: address})
        ).then(res => {
            const response = res.data
            //TODO add messages
        }).catch(response => {
          this.setState({value: "",})
          console.log("Address is not allowed")
      });
    }

    handleChange(event) {   
      this.setState(
        { 
          address: event.target.value,
        }
      ); 
      console.log(this.state.address)
    }

    handleSubmit(event) {
      event.preventDefault();
      this.pushAddress(this.state.address)
    }

    render() {
      const {addresses, address} = this.state
      return (       
          <div className="App">
              <Menubar></Menubar>
              <div style={{marginLeft: '10%', width:'80%', top: '120px', position: 'absolute', zIndex:-20}}>
                <h2 style={{color:'gray'}}>Addressmanagement</h2>
                <hr></hr>
                <h3 style={{color:'#ff5a5a'}} className="float-left">Create a new address</h3>
                <br></br>
                <br></br>
                  <form onSubmit={this.handleSubmit}>
                      <p>
                        <input style={{paddingRight: '65px', paddingTop: '8px', paddingBottom: '8px'}} value={this.state.value} onChange={this.handleChange} name="address" placeholder=""></input>
                        <button class="btn btn-dark searchbarbutton" style={{marginLeft: '20px', paddingLeft: '40px', paddingRight: '40px'}} type="submit">Add</button>                  
                      </p>
                  </form>
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