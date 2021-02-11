//React Standard
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Axios from "axios";

import Menubar from '../component/menubar';

export default class Transactions extends React.Component {
 
  DTRANSACTIONSAPI = "http://0.0.0.0:8000/rest/done-transactions/"

  state = {
    dtransactions: [],
  }

  constructor(props) {
    super(props);
    this.interval = 0;
  }

  componentWillMount() {
    try {
      this.interval = setInterval(async() => {
        Axios.get(this.DTRANSACTIONSAPI).then(Response => {
          const chuncks = Response.data
          console.log(chuncks)
          this.setState({
            dtransactions: chuncks,
          })
        }).catch(errors => {
          this.setState({
            dtransactions: [],
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
      const {dtransactions} = this.state
      return (       
          <div className="App">
              <Menubar></Menubar>
              <div style={{marginLeft: '10%', width:'80%', top: '120px', position: 'absolute', zIndex:-20}}>
                <h2 style={{color:'gray'}}>Done transactions</h2>
                <hr></hr>
                {
                  dtransactions < 1 ? 
                  <div class="alert alert-warning">
                    No transactions
                  </div> 
                  :
                  dtransactions.map(item => (
                          <div class="card" style={{marginBottom: '20px'}}>
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