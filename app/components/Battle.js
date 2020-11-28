import React from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'
import Results from './Results'
import Tooltip from './Tooltip'
import { ThemeConsumer } from '../contexts/theme';

function Instructions () {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className='instructions-container'>
          <h1 className='center-text header-lg'>
            Compare your github score to another github account
        </h1>
          <ol className='container-sm grid center-text battle-instructions'>
            <li>
              <h3 className='header-sm'>Enter two Github users</h3>
              <FaUserFriends className={theme === 'light' ? 'bg-light' : 'bg-dark'} color='rgb(255, 191, 116)' size={30} />
            </li>
            <li>
              <h3 className='header-sm'>Compare</h3>
              <FaFighterJet className={`bg-${theme}`} color='rgb(255, 191, 116)' size={30} />
            </li>
            <li>
              <h3 className='header-sm'>See the winner</h3>
              <FaTrophy className={`bg-${theme}`} color='rgb(255, 191, 116)' size={30} />
            </li>
          </ol>
        </div>        
      )}
    </ThemeConsumer>
  )
}
          
class PlayerInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.state.username)
  }

  handleChange(event) {
    this.setState({
      username: event.target.value
    })
  }
  
  render() {
    return (
      <>
        <ThemeConsumer>
          {({ theme }) => (
            <form className='column player' onSubmit={this.handleSubmit}>
              <label htmlFor='username' className='player-label'>
                {this.props.label}
              </label>
              <div className='row player-inputs'>
                <input
                  type='text'
                  id='username'
                  className={`input-${theme}`}
                  placeholder='github username'
                  autoComplete='off'
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <button
                  className={`btn ${theme === 'dark' ? 'light-btn' : 'dark-btn'}`}
                  type='submit'
                  disabled={!this.state.username}
                >
                  Submit
            </button>
              </div>
            </form>
          )}
        </ThemeConsumer>
      </>
    )
  }
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

function PlayerPreview ({ username, onReset, label }) {
  return (
  <ThemeConsumer>
    {({ theme }) => (
      <div className='column player'>
        <h3 className='player-label'>{label}</h3>
        <div className={`row bg-${theme}`}>
          <div className='player-info'>
            <img
              className='avatar-small'
              src={`https://github.com/${username}.png?size=200`}
              alt={`Avatar for ${username}`}
            />
            <a
              href={`https://github.com/${username}`}
              className='link'>
              {username}
            </a>
          </div>
          <button className='btn-clear flex-center' onClick={onReset}>
            <FaTimesCircle color='rgb(194, 57, 42)' size={26} />
          </button>
        </div>
      </div>
    )}
  </ThemeConsumer>
  )
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export default class Battle extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      playerOne: null,
      playerTwo: null,
      battle: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.onReset = this.onReset.bind(this)
    this.onKeyEnter = this.onKeyEnter.bind(this)
  }
  handleSubmit(id, player) {
    this.setState({
      [id]: player
    })
  }
  handleReset(id) {
    this.setState({
      [id]: null
    })
  }

  onReset(){
    this.setState({
      playerOne: null,
      playerTwo: null,
      battle: false
    })
  }

  onKeyEnter(e){
    if (e.charCode === 13) {
      this.setState({
        battle: true
      })
    }
  }


  render() {
    const { playerOne, playerTwo, battle } = this.state

    if (battle === true) {
      return <Results 
                playerOne={playerOne} 
                playerTwo={playerTwo}
                onReset={this.onReset} />
    }

    return (
      <React.Fragment>
        <Instructions />

        <div className='players-container'>
            <h1 className='center-text header-lg'>Github Accounts</h1>
          <div className='row space-around'>
            {playerOne === null
              ? <PlayerInput
                  label='Github User #1'
                  onSubmit={(player) => this.handleSubmit('playerOne', player)}
                />
              : <PlayerPreview
                  username={playerOne}
                  label='Github User #1'
                  onReset={() => this.handleReset('playerOne')}
                />
            }

            {playerTwo === null
              ? <PlayerInput
                  label='Github User #2'
                  onSubmit={(player) => this.handleSubmit('playerTwo', player)}
                />
              : <PlayerPreview
                  username={playerTwo}
                  label='Github User #2'
                  onReset={() => this.handleReset('playerTwo')}
                />
            }
          </div>


          {playerOne && playerTwo && (
            <button
              onKeyPress={this.onKeyEnter}
              className='btn dark-btn btn-space'
              onClick={() => this.setState({battle: true})}
            >
              Battle
            </button>
          )}
        </div>
      </React.Fragment>
    )
  }
}