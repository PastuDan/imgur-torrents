import React, {Component} from 'react';

// import '../styles/reset.css'
// import '../styles/base.css'

const itemHeight = 50; //must also update in CSS
const itemSpacing = 50;

const placeholder = document.createElement('div');
placeholder.className = 'grid-item placeholder';

export default class App extends Component {
    state = {
        items: [
            {
                id: '2iafK', //todo: use unique IDs for these
                title: 'Samsung',
                icon: 'power'
            },
            {
                id: 'jeIk3',
                title: 'Sanyo',
                icon: 'power'
            },
            {
                id: '2klfeP',
                title: 'Xbox',
                icon: 'power'
            },
            {
                id: '8IwoF',
                title: 'Channel',
                icon: 'up-arrow'
            },
            {
                id: 'aaa11',
                title: 'Channel',
                icon: 'down-arrow'
            },
            {
                id: 'bbb22',
                title: 'Volume',
                icon: 'down-arrow'
            },
            {
                id: 'ccc33',
                title: 'Volume',
                icon: 'down-arrow'
            },
            {
                id: 'ddd33',
                title: 'Secret Button',
                icon: 'down-arrow'
            },
        ]
    };

    dragStart = (e) => {
        this.dragged = e.currentTarget;
        e.dataTransfer.effectAllowed = 'move';
    }

    dragEnd = () => {
        this.dragged.style.display = 'block';
        this.dragged.parentNode.removeChild(placeholder);

        // Update state
        const items = this.state.items;
        const from = Number(this.dragged.dataset.id);
        let to = Number(this.over.dataset.id);
        if(from < to) to--;
        if (this.nodePlacement == 'after') to++;
        items.splice(to, 0, items.splice(from, 1)[0]);
        this.setState({items});
    }

    dragOver = (e) => {
        e.preventDefault();
        this.dragged.style.display = 'none';
        if(e.target.className == 'placeholder') return;
        this.over = e.target;

        const relY = e.clientY - this.over.offsetTop;
        const height = this.over.offsetHeight / 2;
        const parent = e.target.parentNode;

        if (relY > height) {
            this.nodePlacement = 'after';
            parent.insertBefore(placeholder, e.target.nextElementSibling)
        } else if (relY < height) {
            this.nodePlacement = 'before';
            parent.insertBefore(placeholder, e.target);
        }

    }

    render() {

        return <section className="grid cf" onDragOver={this.dragOver}>
            {this.state.items.map((item) => {
                return <div
                    draggable="true"
                    onDragEnd={this.dragEnd}
                    onDragStart={this.dragStart}
                    className="grid-item"
                    key={item.id}>
                    {item.title}
                </div>;
            })}
        </section>;
    }
}