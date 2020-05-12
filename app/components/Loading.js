import React, { Component } from 'react';


export default class Loading extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: 'Loading'
    }    
  }

  componentDidMount() {
    window.setInterval(() =>{
      this.state.content === 'Loading' + '...'
        ? this.setState({ content: 'Loading'})
        : this.setState(({ content }) => ({ content: content + '.' }) )
    }, 300)
  }

  render () {

    return (
      <p>
        {this.state.content}
      </p>
    )
  }

 
}