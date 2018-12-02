import React from 'react';
import PropTypes from 'prop-types';

function SelectLanguage(props) {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (

        <ul className='languages'>
            {languages.map(lang => {
                return (
                    /* if the language was selected, apply the main red color, otherwise, do nothing */
                    <li style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
                        onClick={props.onSelect.bind(null, lang)}
                        key={lang}>{lang}</li>
                )
            })}
        </ul>

    )
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
    constructor(props) {
        super(props);
        // the initially selected language will default to 'All'
        this.state = {
            selectedLanguage: 'All'
        }
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(lang) {
        this.setState({
            selectedLanguage: lang
        })
    }

    render() {
        const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
        return (
            <div>
                <SelectLanguage selectedLanguage={this.state.selectedLanguage} onSelect={this.updateLanguage} />
            </div>
        )
    }
}

export default Popular;