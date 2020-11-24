import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center'
  }
}


export default class Loading extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: props.text
    }    
  }

  componentDidMount() {
    const {speed, text } = this.props;

    // the "this" in this.interval is setting an instance property in the componentDidMount that can be accessed in componentDidUnMount() and elsewhere in the class
    // using an instance property allows other functions and parts of the component to access the variable
    // setInterval - every 300 seconds, the function will be invoked
    this.interval = window.setInterval(() =>{
      console.log("i am a memory leak")
      this.state.content === text + '...'
        ? this.setState({ content: text})
        : this.setState(({ content }) => ({ content: content + '.' }) )
    }, speed)
  }

  componentWillUnmount(){
     // the "this" in this.interval is an instance property set in the componentDidMount
    // we are clearing the interval, by passing it the interval stored in ComponentDidMount()
    console.log("clearing memory leak")
    window.clearInterval(this.interval)
  }

  render () {
    return (
      <p style={styles.content}>
        {this.state.content}
      </p>
    )
  } 
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
  speed: 300,
  text: 'Loading'
}