import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Card from './Card';
import Loading from './Loading';
import Tooltip from './Tooltip'

import { fetchPopularRepos } from '../utils/api';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa';

const LanguagesNav = ({ selectedLanguage, updateLanguage}) => {

  const languages = ['All', 'JavaScript', 'Ruby', 'Python', 'CSS'];

  return (
    <ul className="flex-center">
      {languages.map((language, index) => (
        <li key={index}>
          <button
            style={{ color: selectedLanguage === language ? '#BA6C65' : '#000' }}
            onClick={() => updateLanguage(language)}
            className="btn-clear nav-link">
            {language}
          </button>
        </li>
      ))}
    </ul>    

  )
}

function ReposGrid ({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {

        const { name, owner, html_url, stargazers_count, forks, open_issues} = repo;
        const { login, avatar_url } = owner;

        return (
            <Card
              header={`${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}
            >
              <ul className='card-list'>
                <li>
                  <Tooltip text="Github user name">
                    <FaUser color='rgb(255,191,116)' size={22} />
                    <a href={`https://github.com/${login}`}>
                      {login}
                    </a>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip text='github star count'>
                    <FaStar color='rgb(255,215,0)' size={22} />
                    {stargazers_count.toLocaleString()} stars
                  </Tooltip>
                </li>
                <li>
                  <FaExclamationTriangle color='rgb(255,215,0)' size={22} />
                  {open_issues.toLocaleString()} open issues
                  </li>
              </ul>              
            </Card>
        )

      })}
    </ul>
  )
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

export default class Popular extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All',
      repos: {},
      error: null
    }

    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this)
  }

  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage(selectedLanguage) {
  
    this.setState({
      selectedLanguage,
      error: null,
    })

    // IF whatever the selectedLanguage is DOES NOT exist in our object as a key, run fetchPopularRepos
    if (!this.state.repos[selectedLanguage]) {

        fetchPopularRepos(selectedLanguage) 
          .then((data) => {
            this.setState(({ repos }) => ({
              repos: {
                ...repos,
                [selectedLanguage]: data
              }
            }))
          })
          .catch(() => {
            console.warn('Error fetching repos: ', error)

            this.setState({
              error: `there was an error fetching the repositories`
            })
          })          
    }
      console.log(this.state.repos)
  }

  isLoading() {
    const { selectedLanguage, repos, error } = this.state;
    // if repos object does NOT have a key on it of the selectedLanguage and no errors
    return !repos[selectedLanguage] && error === null
  }

  render() {

    const { selectedLanguage, repos, error } = this.state;
   
    return (
        <>
          <LanguagesNav
            updateLanguage={this.updateLanguage}
            selectedLanguage={selectedLanguage}
          />
          {this.isLoading() && <Loading text='Fetching Repos' />}

          {error && <p className="error center-text">{error}</p>}

        {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} /> }

        </>
    )
  }
}


LanguagesNav.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired
}