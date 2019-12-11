import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { fetchPopularRepos } from '../utils/api';

const LanguagesNav = ({ selectedLanguage, updateLanguage}) => {

  const languages = ['All', 'JavaScript', 'Ruby', 'Python', 'CSS'];

  return (
    <ul className="flex-center">
      {languages.map((language, index) => (
        <li key={index}>
          <button
            style={{ color: selectedLanguage === language ? 'rgb(187,46,31)' : '#000' }}
            onClick={() => updateLanguage(language)}
            className="btn-clear nav-link">
            {language}
          </button>
        </li>
      ))}
    </ul>    

  )
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
      // if repos object does not have a key on it of the selectedLanguage
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
          {this.isLoading() && <p>LOADING...</p>}

          {error && <p>{error}</p>}

          {repos[selectedLanguage] &&  <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre> }
        </>
    )
  }
}


LanguagesNav.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired
}