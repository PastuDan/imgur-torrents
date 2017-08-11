import React, {Component} from 'react';
import Header from './Header'

// import '../styles/reset.css'
// import '../styles/base.css'

export default class App extends Component {
    state = {
        wideLogoLetters: true,
        active: false,
    };

    componentDidMount() {

        //todo: do this in css animation
        window.setTimeout(() => {
            this.setState({
                wideLogoLetters: false
            })
        }, 0);
    }

    handleClick = () => {
        this.setState({
            active: true
        });

        window.setTimeout(() => {
            this.setState({
                active: false
            })
        }, 300);
    };

    render() {
        return <header onClick={this.handleClick}>
            <div className={`logo ${this.state.wideLogoLetters ? 'wide' : ''}`}>
                PowerUp
            </div>
            <div className={`status-light ${this.state.active ? 'active' : ''}`}></div>
        </header>;
    }
}