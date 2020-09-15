import React, { Component } from 'react';
import './App.css';
import axios from "axios"

class App extends Component {
  state = {
    searhterm: "",
    d_none: "d_none",
    contents: []
  }

  handleChange = async (e) => {
    e.stopPropagation();
    this.setState({ searhterm: e.target.value });
    let term=this.state.searhterm

    const response = await axios.get(`http://localhost:8080/search/stream?term=${term}`)
    const listdata = await response.data
    this.setState({ contents: [...listdata] })  

  }

  postUsers = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let term=this.state.searhterm
    const response = await axios.get(`http://localhost:8080/search/stream?term=${term}`)
    const listdata = await response.json() 
    console.log("Buton ile gelen response",listdata)  
    this.setState({ searhterm: "" })
    this.setState({ d_none: "d_none" })
    this.setState({ content: [] })


  }

  render() {
    return (
      <div className="v-main" onClick={() => this.setState({ d_none: "d_none" })}>
        <div className="v-center">
          <div className="v-form">
            <input type="text"
              id="name"
              name="searhterm"
              value={this.state.searhterm}
              onChange={this.handleChange}
              onClick={(e) => { e.stopPropagation(); this.setState({ d_none: "" }) }}
              placeholder="Search"
              className="searchinput">
            </input>
            <button onClick={this.postUsers} >
              <i className="fa fa-search"></i>
            </button>
          </div>
          <div className={`titles ${this.state.d_none}`}>
            <ul >
              {
                this.state.contents.length > 0 ? this.state.contents.map((content, index) =>
                  <li key={index} onClick={() => this.setState({ searhterm: content.deviceId })}>
                    {content.deviceId}
                  </li>
                )
                  : ""
              }

            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default App;