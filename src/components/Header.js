import React, {Component} from 'react';
import moment from 'moment';

const cycleInterval = 3 * 1000;

console.log(moment.format('YY'));

export default class Header extends Component {
    state = {
        wideLogoLetters: true,
        active: false,
    };

    messageIndex = 0;

    componentDidMount() {
        //todo: do this in css animation
        const animateLogoLetters = () => {
            window.setTimeout(() => {
                this.setState({
                    wideLogoLetters: false
                })
            }, 0);
        }

        animateLogoLetters();

        window.setInterval(() => {
            const headerMessages = [
                'PowerUp',
                '8',
                '☀️ 80˚'
            ]

            this.messageIndex++;

            this.setState({
                wideLogoLetters: false,
                message: headerMessages[this.messageIndex % headerMessages.length]
            }, () => {
                animateLogoLetters();
            })
        }, cycleInterval)
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