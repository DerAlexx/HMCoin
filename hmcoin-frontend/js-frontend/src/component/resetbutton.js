//React Standard
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Axios from "axios";

//Stylesheets
import './css/menubar.css'

export default class ResetButton extends React.Component {

    RESETAPI = "http://0.0.0.0:8000/rest/reset/"

    state = {
        message: ""
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        Axios.get(this.RESETAPI)
            .then(Response => {
            const res = Response.data
            if (res !== undefined) {
                this.setState({
                    message: res.info
                })
            } else {
                this.setState({
                    message: "A problem occurred while trying to reset the Blockchain"
                })
            }
          }).catch(error => {
            this.setState({
                message: "Cannot reset the blockchain"
            })
            console.log(error)
          })
    }
    

    render() {
        const {message} = this.state
        return (       
            <div>
                {message ? 
                    <div class="alert alert-secondary">
                        {message}
                    </div> 
                : undefined}
                <button onClick={this.handleClick} className="btn btn-outline-danger">
                    Reset Blockchain
                </button>
            </div>
        )
        }
    }