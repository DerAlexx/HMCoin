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
    number: 0, //number of runs
    tohash: undefined,
    proofofwork: ""
  }

  constructor(props) {
    super(props);
    this.number = 0;
    this.work = this.work.bind(this);
  }

  componentWillMount() {
    Axios.get(this.BLOCKCHAINAPI).then(Response => {
      const chuncks = Response.data
      this.setState({
        miningtrans: chuncks,
        number: this.work(chuncks)[0],
        tohash: chuncks.id + chuncks.proof + chuncks.sender,
        proofofwork: this.work(chuncks)[1]
      })
    }).catch(errors => {
      this.setState({
        miningtrans: "",
      })
    })
  }

  //miningtrans.id + num + miningtrans.sender
  work(miningtrans) {
    var hash = sha256(miningtrans.id + miningtrans.proof + miningtrans.sender)
    var number_of_runs = 0
    do {
      number_of_runs++
      hash = sha256(hash).toString()
      console.log(hash, number_of_runs)
    } while(!hash.startsWith("11"))
    console.log(number_of_runs)
    // this.state({
    //   tohash: miningtrans.id + miningtrans.proof + miningtrans.sender,
    //   number: number_of_runs
    // })
    return [number_of_runs, hash]
  }

  render() {
      var {miningtrans, number, tohash, proofofwork} = this.state
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
                1) The value to hash: {tohash} 
                <br></br>
                <br></br>
                2) Number of runs: {number}
                <br></br>
                <br></br>
                3) Pof: {proofofwork}
                <hr></hr>
                <button className="btn btn-outline-danger">Send proof-of-work</button>
              </div>
          </div>
      )
    }
  }