import React, {Component} from 'react';
import Header from './Header'
import Grid from './Grid'

// import '../styles/reset.css'
// import '../styles/base.css'

export default class App extends Component {
    state = {
        dark: true
    }

    toggleTheme = () => {
        this.setState({
            dark: !this.state.dark
        });
    }

    render() {
        return <div onDoubleClick={this.toggleTheme} onClick={this.handleClick} className={`remote-io-app ${this.state.dark ? 'dark' : 'light'}`}>
            <Header onThemeChange={this.toggleTheme} />
            <Grid />
        </div>;
    }
}