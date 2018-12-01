import React from 'react';

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
            <ul className='languages'>
                {languages.map(lang => {
                    return (
                        /* if the language was selected, apply the main red color, otherwise, do nothing */
                        <li style={lang === this.state.selectedLanguage ? { color: '#d0021b' } : null}
                            onClick={this.updateLanguage.bind(null, lang)}
                            key={lang}>{lang}</li>
                    )
                })}
            </ul>
        )
    }
}

export default Popular;