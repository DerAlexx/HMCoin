//React Standard
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Axios from "axios";
import axios from 'axios';

import sha256 from 'crypto-js/sha256';

import Menubar from '../component/menubar';

export default class Mining extends React.Component {
 
  BLOCKCHAINAPI = "http://0.0.0.0:8000/rest/mining/"

  state = {
    miningtrans: "",
    miningtrans_original: "",
    number: 0,
    tohash: undefined
  }

  constructor(props) {
    super(props);
    this.number = 0;
    this.work = this.work.bind(this);
  }

  componentDidMount() {
    Axios.get(this.BLOCKCHAINAPI).then(Response => {
      const chuncks = Response.data
      this.setState({
        miningtrans: chuncks,
      })
      this.work(chuncks)
    }).catch(errors => {
      this.setState({
        miningtrans: "",
      })
    })
    
  }

  //miningtrans.id + num + miningtrans.sender
  work(miningtrans) {
    var tohash = miningtrans.id + miningtrans.proof + miningtrans.sender
    var hash = sha256(tohash)
    var number_of_runs = 0
    do {
      number_of_runs++
    } while(!hash.startsWith("11"))
  }

  render() {
      const {miningtrans, number, tohash} = this.state
      return (       
          <div className="App">
              <Menubar></Menubar>
              <div style={{marginLeft: '10%', width:'80%', top: '120px', position: 'absolute', zIndex:-20}}>
                <h2 style={{color:'gray'}}>Mining</h2>
                <hr></hr>
                {
                  miningtrans < 1 ? 
                  <div class="alert alert-warning">
                    No open transactions for mining
                  </div> 
                  :
                  <div class="card">
                    <div class="card-body">
                      #{miningtrans.id}, Sender: {miningtrans.sender}, Recipient: {miningtrans.recipient}, Quantity: {miningtrans.quantity}, Reward: {miningtrans.reward}
                    </div>
                  </div>
                }
                <hr></hr>
                1) Getting a secret: {number}
                <br></br>
                <br></br>
                2) The value to hash: {tohash}
                <br></br>
                <br></br>
                3) The hash:
                <hr></hr>
                <button>Send hash</button>
              </div>
          </div>
      )
    }
  }