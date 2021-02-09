//React Standard
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Axios from "axios";

import Menubar from '../component/menubar';

export default class OpenTransactions extends React.Component {
 
    OTRANSACTIONSAPI = "http://0.0.0.0:8000/rest/open-transactions/"

    state = {
      otransactions: [],
    }

    constructor(props) {
      super(props);
      this.interval = 0;
    }

    componentWillMount() {
      try {
        this.interval = setInterval(async() => {
          Axios.get(this.OTRANSACTIONSAPI).then(Response => {
            const chuncks = Response.data
            console.log(chuncks)
            this.setState({
              otransactions: chuncks,
            })
          }).catch(errors => {
            this.setState({
              otransactions: [],
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
      const {otransactions} = this.state
      return (       
          <div className="App">
              <Menubar></Menubar>
              <div style={{marginLeft: '10%', width:'80%', top: '120px', position: 'absolute', zIndex:-20}}>
                <h2 style={{color:'gray'}}>Open transactions</h2>
                <hr></hr>
                {
                  otransactions < 1 ? 
                  <div class="alert alert-warning">
                    No open transactions
                  </div> 
                  :
                  otransactions.map(item => (
                          <div class="card">
                            <div class="card-body">
                              #{item.id}, Sender: {item.sender}, Recipient: {item.recipient}, Quantity: {item.quantity}, Reward: {item.reward}
                            </div>
                          </div>
                    ))
                }
                <br></br>
                <br></br>
              </div>
          </div>
      )
    }
  }