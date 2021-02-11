import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import axios from 'axios';

import Menubar from '../component/menubar';

export default class CoinTransaction extends React.Component {
 
  NEWTRANSAPI = "http://0.0.0.0:8000/rest/new-transactions/"

  state = {
    sender: "",
    recipient: "",
    amount: 1,
    message: undefined
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.pushTransaction = this.pushTransaction.bind(this);
  }


  pushTransaction(sender, recipient, amount) {
    console.log(sender, recipient, amount)
    axios.post(this.NEWTRANSAPI,
        JSON.stringify({
          sender: sender,
          recipient:recipient,
          quantity: parseInt(amount),
        })
      ).then(res => {
          const response = res.data
          this.setState({
            message: response
          })
      }).catch(res => {
        console.log("Transaction is not allowed")
        this.setState({
          message: {"info": "Transaction not allowed"}
        })
    });
  }

  handleChange(event) { 
    this.setState(
      { 
        [event.target.name]: event.target.value,
      }
    ); 
  }

  handleSubmit(event) {
    event.preventDefault();
    this.pushTransaction(this.state.sender, this.state.recipient, this.state.amount)
  }


  render() {
    const {message} = this.state
      return (       
          <div className="App">
              <Menubar></Menubar>
              <div style={{marginLeft: '10%', width:'80%', top: '120px', position: 'absolute', zIndex:-20}}>
                <h2 style={{color:'gray'}}>Send HMCoins</h2>
                <hr></hr>
                {message !== undefined ? 
                  <div class="alert alert-secondary">
                    {message.info}
                  </div> 
                  : undefined}
                <br></br>
                <br></br>
                  <form onSubmit={this.handleSubmit}>
                      <p>
                        <label for="sender">Senderaddress</label><br></br>
                        <input style={{width:'100%', height: '40px'}} value={this.state.value} onChange={this.handleChange} name="sender" placeholder="sender"></input>
                        <br></br>
                        <br></br>
                        <label for="recipient">Recipientaddress</label><br></br>
                        <input style={{width:'100%', height: '40px'}} value={this.state.value} onChange={this.handleChange} name="recipient" placeholder="recipient"></input>
                        <br></br>
                        <br></br>
                        <label for="amount">Amount</label><br></br>
                        <input style={{width:'100%', height: '40px'}} value={this.state.value} onChange={this.handleChange} name="amount" placeholder="Coins"></input>
                        <br></br>
                        <br></br>
                        <button class="btn btn-dark searchbarbutton" style={{marginLeft: '20px', paddingLeft: '40px', paddingRight: '40px'}} type="submit">Transfer coins</button>                  
                      </p>
                  </form>
              </div>
          </div>
      )
    }
  }