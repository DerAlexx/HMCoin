//React Standard
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Axios from "axios";
import axios from 'axios';

import SHA256 from 'crypto-js/sha256';
import Hex from 'crypto-js/enc-hex';

import Menubar from '../component/menubar';

export default class Mining extends React.Component {
 
  BLOCKCHAINAPI = "http://0.0.0.0:8000/rest/mining/"
  VERFIYAPI = "http://0.0.0.0:8000/rest/verify/"

  state = {
    miningtrans: "",
    number: 0, //number of runs
    tohash: undefined,
    proofofwork: "", 
    message: ""
  }

  constructor(props) {
    super(props);
    this.number = 0;
    this.work = this.work.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    axios.post(this.VERFIYAPI,
      JSON.stringify({
          transaction_id: this.state.miningtrans.id,
          runs: this.state.number})
      ).then(res => {
          const response = res.data
          this.setState({message: response.info,})
      }).catch(response => {
        this.setState({message: "Cannot verfiy the number of runs",})
        console.log("Cannot submit proof of work")
    });
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
    var hash = SHA256(miningtrans.id + miningtrans.proof + miningtrans.sender).toString(Hex)
    var number_of_runs = 1
    do {
      console.log(number_of_runs, hash)
      number_of_runs++
      hash = SHA256(hash).toString(Hex)
    } while(!hash.startsWith("11"))
    console.log(number_of_runs, hash)
    return [number_of_runs, hash]
  }

  render() {
      var {miningtrans, number, tohash, proofofwork, message} = this.state
      return (       
          <div className="App">
              <Menubar></Menubar>
              <div style={{marginLeft: '10%', width:'80%', top: '120px', position: 'absolute', zIndex:-20}}>
                <h2 style={{color:'gray'}}>Mining</h2>
                {message ? 
                  <p>
                    <hr></hr>
                    <div class="alert alert-secondary">
                      {message}
                    </div> 
                  </p>
                  : undefined}
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
                3) PoW: {proofofwork}
                <hr></hr>
                <button onClick={this.handleClick} className="btn btn-outline-danger">Send Proof-of-Work</button>
              </div>
          </div>
      )
    }
  }