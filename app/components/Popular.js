import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';

function SelectLanguage(props) {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
        <ul className='languages'>
            {languages.map(function (lang) {
                return (
                    <li
                        // if the language was selected, apply the main red color, otherwise, do nothing 
                        style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
                        onClick={props.onSelect.bind(null, lang)}
                        key={lang}>
                        {lang}
                    </li>
                )
            })}
        </ul>
    )
}

function RepoGrid(props) {
    return (
        <ul className='popular-list'>
            {props.repos.map(function (repo, index) {
                return (
                    <li key={repo.name} className='popular-item'>
                        <div className='popular-rank'>#{index + 1}</div>
                        <ul className='space-list-items'>
                            <li>
                                <img
                                    className='avatar'
                                    src={repo.owner.avatar_url}
                                    alt={'Avatar for ' + repo.owner.login}
                                />
                            </li>
                            <li><a href={repo.html_url}>{repo.name}</a></li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
};

class Popular extends React.Component {
    constructor(props) {
        super();
        // the initially selected language will default to 'All'
        this.state = {
            selectedLanguage: 'All',
            repos: null,
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    // once the component mounts, the updateLanguage method is called with an initial language of 'All' passed in
    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }

    // the selected language is updated the what the user clicks on in addition to the fetchPopularRepos function being called on the clicked on language
    updateLanguage(lang) {
        this.setState(function () {
            return {
                selectedLanguage: lang,
                repos: null
            }
        });

        api.fetchPopularRepos(lang)
            .then(function (repos) {
                this.setState(function () {
                    return {
                        repos: repos
                    }
                });
            }.bind(this));
    }
    render() {
        return (
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage} />
                {/* while this.state.repos does not contain any info, display loading... Display the RepoGrid once repos exists within state */}
                {!this.state.repos ? <p>Loading...</p> : <RepoGrid repos={this.state.repos} />}
            </div>
        )
    }
}

export default Popular;