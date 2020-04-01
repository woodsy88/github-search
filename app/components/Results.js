import React from 'react';
import { battle } from '../utils/api';
import { FaUser, FaUsers, FaUserFriends, FaCompass, FaBriefcase } from 'react-icons/fa';

export default class Results extends React.Component {
  constructor(props) {
    super(props)

    this.state ={
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount(){
    const { playerOne, playerTwo } = this.props;

    battle([playerOne, playerTwo])
      .then((players) => {
        this.setState({ 
          winner: players[0],
          loser: players[1],
          error: null,
          loading: null
        })
        console.log(this.state)
      }).catch(({ message }) => {
        this.setState({ 
          error: message,
          loading: false
        })
      })
  }

  render () {

    const { winner, loser, error, loading } = this.state;

    if (loading) {
      return <p>LOADING...</p>
    }

    if (error) {
      return (
        <p>{error}</p>
        )
    }

    return (
      <div className="grid space-around container-sm">
        <div className="card bg-light">
          <h4 className="header-lg center-text">
            {winner.score === loser.score ? 'Tie' : 'Winner'}
          </h4>
          <img src={winner.profile.avatar_url} alt={winner.profile.login} />
          <h2 className="center-text">
            <a href={winner.profile.html_url}>
              {winner.profile.login}
            </a>
          </h2>
          <ul className="class-list">
            <li>
              <FaUser color='rgb(144,115,255)' size={22} />
              {winner.profile.name}
            </li>

            {winner.profile.location && (
              <li>
                <FaCompass color='rgb(144,115,255)' size={22}/>
                { winner.profile.location }
              </li>
              )}
            
   

            <li>
                <FaUsers color='rgb(144,115,255)' sie={22} />
                {winner.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FaUserFriends color='rgb(144,115,255)' sie={22} />
              {winner.profile.following.toLocaleString()} following
            </li>
          </ul>
        </div> 
        <div className="card bg-light">
          <h4 className="header-lg center-text">
            {loser.score === winner.score ? 'Tie' : 'loser'}
          </h4>
          <img src={loser.profile.avatar_url} alt={loser.profile.login} />
          <h2 className="center-text">
            <a href={loser.profile.html_url}>
              {loser.profile.login}
            </a>
          </h2>
          <ul className="class-list">
            <li>
              <FaUser color='rgb(144,115,255)' size={22} />
              {loser.profile.name}
            </li>

            <li>
                <FaUsers color='rgb(144,115,255)' sie={22} />
                {loser.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FaUserFriends color='rgb(144,115,255)' sie={22} />
              {loser.profile.following.toLocaleString()} following
            </li>
          </ul>
        </div>        
      </div>
    )
  }
}