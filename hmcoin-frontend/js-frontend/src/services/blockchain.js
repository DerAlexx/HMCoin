//React Standard
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Axios from "axios";

import ResetButton from "../component/resetbutton"
import Menubar from '../component/menubar';

export default class Blockchain extends React.Component {
 
  BLOCKCHAINAPI = "http://0.0.0.0:8000/rest/blockchain/"

  state = {
    transactions: [],
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
            transactions: chuncks,
          })
        }).catch(errors => {
          this.setState({
            transactions: [],
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
    const {transactions} = this.state
    return (       
          <div className="App">
              <Menubar></Menubar>
              <div style={{marginLeft: '10%', width:'80%', top: '120px', position: 'absolute', zIndex:-20}}>
                <h2 style={{color:'gray'}}>The current Blockchain</h2>
                <hr></hr>
                <ResetButton></ResetButton>
                <hr></hr>
                {
                  transactions < 1 ? 
                  <div class="alert alert-warning">
                    No transactions
                  </div> 
                  :
                  transactions.map(item => (
                          <p class="card">
                            <div class="card-body">
                              #{item.id}, Sender: {item.sender}, Recipient: {item.recipient}, Quantity: {item.quantity}, Reward: {item.reward}
                            </div>
                          </p>
                    ))
                }
                <br></br>
                <br></br>
              </div>
          </div>
      )
    }
  }