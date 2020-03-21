import React, { Component } from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Results from './Results';


function Instructions () {
  return (
    <div className="instructions-container">
      <h1 className="center-text header-lg">
        Instructions
      </h1>

      <ol className="container-sm grid center-text battle-instructions">
        <li>
          <h3 className="header-sm">Enter two Github Users</h3>
          <FaUserFriends className="bg-light" color='rgb(255,191,116)' size={140} />
        </li>
        <li>
          <h3 className="header-sm">Battle</h3>
          <FaFighterJet className="bg-light" color='#727272' size={140} />
        </li>
        <li>
          <h3 className="header-sm">See the winners</h3>
          <FaTrophy className="bg-light" color='rgb(255,215,0)' size={140} />
        </li>                
      </ol>
     
    </div> 
  )
}

class PlayerInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ''                   
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    console.log("handle change ran")
    let value = e.target.value;
    this.setState({ username: value})
    console.log(this.state.username);    
  }

  handleSubmit (e) {
    e.preventDefault()
    console.log("PlayerInput handle submit ran", this.props);
    this.props.onSubmit(this.state.username)  
  }


  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">{this.props.label}</label>
        <div className="row player-inputs">
            <input 
              onChange={this.handleChange} 
              value={this.state.username} 
              type="text"
              autoComplete='off'
              placeholder='github username'
              className="input-light"
              id='username'

              />   
        </div>
          <button 
            type="submit"
            // IF username is falsey (empty), then make disabled TRUE
            disabled={!this.state.username}
            className="btn dark-btn"
            >Submit me</button>
      </form>
    )
  }

}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

function PlayerPreview ({ username, onReset, label }) {
  console.log(username, onReset, label)
  return (
    <div className="column player">
      <h3 className="player-label">{label}</h3>
      <div className="row bg-light">
        <div className="player-info">
          <img
            className="avatar-small"
            src={`https://github.com/${username}.png?size=200`} 
            alt={`Avatar for ${username}`}/>
          <a href={`https://github.com/${username}`} className='link'>{username}</a>
        </div>
        <button onClick={onReset} className='link'>
          <FaTimesCircle color='rgb(19,57,42)' size={26} /> 
        </button>
      </div>
    </div>
  )
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export default class Battle extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playerOne: null,
      playerTwo: null,
      battle: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);    
  }

  handleSubmit(id, player){
    console.log("Battle handle submit ran", id, player)
    this.setState({ 
      [id]: player
    })
  }

  handleReset(id) {
    this.setState({
      [id]: null
    })
  }

  render() {

    const {playerOne, playerTwo, battle } = this.state;

    if ( battle === true) {
      return <Results playerOne={playerOne} playerTwo={playerTwo}/>
    }

    return (
      <>
        <Instructions />
        
        <div className="players-container">
          <h1 className="center-text header-lg">Players</h1>
          <div className="row space-around">
            {playerOne === null ?  
              <PlayerInput
                label='Player One'
                // going to pass onSubmit whats in the input field - player - which is players name - which comes from the component PlayerInputs' state
                onSubmit={(player) => this.handleSubmit('playerOne', player) }
              />
             : <PlayerPreview username={playerOne} label='playerOne' onReset={() => this.handleReset('playerOne')} />
          
          }
          {playerOne !== null && <h2>{this.state.playerOne}</h2>}


            {playerTwo === null ? 
              <PlayerInput
                label='Player One'
                onSubmit={(player) => this.handleSubmit('playerTwo', player)}
              />
              : <PlayerPreview username={playerTwo} label='playerTwo' onReset={() => this.handleReset('playerTwo')} />
            }  
            {playerTwo !== null && <h2>{this.state.playerTwo}</h2>}          
          </div>

          {playerOne && playerTwo && (
            <button 
              className="btn btn dark-btn btn-space"
              onClick={() => this.setState({battle: true})}
              > Get Results

            </button> 

          )}
        </div>

      </>
    )
  }
}
