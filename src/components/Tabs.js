import React, { PureComponent } from 'react';
import axios from 'axios';
import base64 from 'base-64'
import markTwain from 'mark-twain';
import parseJsonMLFactory from '../helpers/parseJsonMLFactory';
import debounce from 'lodash.debounce';

const setStylesForItems = (visibleItems, margin, itemsInOneLine) => {
    let maxHeight = 0;
    let top = 0;
    let containerHeight = 0;

    visibleItems.forEach((item, index) => {
        item.style.cssText = `
       display: block;
    `;

        const left = !(index % itemsInOneLine) ? 0 : `${item.clientWidth + 2 * margin}px`;
        if (!(index % itemsInOneLine)) {
            const nextItemHeight = visibleItems[index + 1] ? visibleItems[index + 1].clientHeight : 0;
            maxHeight = Math.max(item.clientHeight, nextItemHeight);
            top = containerHeight + Math.floor(index / itemsInOneLine) * 2 * margin;
            containerHeight += maxHeight;
        }

        item.style.cssText = `
      position: absolute;
      height: ${maxHeight}px;
      left: ${left};
      top: ${top}px;
    `;
    });

    document.querySelectorAll('.tabs__content')[0].style.height = `${top + maxHeight + margin}px`;
};

const filter = category => {
    const allItems = [...document.querySelectorAll('.tabs__content li')];

    const visibleItems = allItems.filter(item => category === 'all' || item.dataset.category === category);
    const hiddenItems = category !== 'all' ? allItems.filter(item => item.dataset.category !== category) : [];

    const margin = 16; // equal 1rem
    const rwdBreakpoint = 768;
    const itemsInOneLine = window.innerWidth <= rwdBreakpoint ? 1 : 2;

    hiddenItems.forEach(element => element.style.cssText = 'display: none');

    setStylesForItems(visibleItems, margin, itemsInOneLine);
};

class Tabs extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            _asyncRequest: null,
            bhProjects: [],
        }
    }

    componentWillMount() {
        this._asyncRequest = axios.get('https://api.github.com/users/brainhubeu/repos')
            .then(response => {
                this._asyncRequest = null;
                this.setState({
                    bhProjects: response.data.map(repo => ({
                        category: 'bh',
                        name: repo.name,
                        href: repo.html_url,
                        desc: repo.description,
                    }))
                })
            })
            .catch(function (error) {
                console.log(error);
            });

        this._asyncRequest = axios.get('https://api.github.com/repos/brainhubeu/brainhubeu.github.io/readme')
            .then(response => {
                this._asyncRequest = null;
                this.setState({
                    readme: base64.decode(response.data.content)
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        filter('all');
        const tabNavButtons = document.querySelectorAll('.tabs-nav__button');

        const arrow = document.querySelector('.top-banner__arrow');
        const nextSection = document.querySelector('.intro__container');

        arrow.addEventListener('click', () => {
            window.scrollBy({
                top: nextSection.getBoundingClientRect().top + 1,
                left: 0,
                behavior: 'smooth',
            })
        });

        // click button in menu
        tabNavButtons.forEach(link => {
            link.addEventListener('click', function() {
                // toggle class in tab nav buttons
                if (!this.classList.contains('active')) {
                    tabNavButtons.forEach(function(el) {
                        el.classList.remove('active');
                    });
                    this.classList.add('active');
                    filter(this.dataset.category);
                } else {
                    return false;
                }
            });
        });

        // resize window
        window.onresize = debounce(function() {
            const activeCategory = document.querySelector('.tabs-nav__button.active').dataset.category;
            filter(activeCategory);
        }, 300);
    }

    render() {

        const jsonML = markTwain(this.state.readme);
        const teammatesProjects = parseJsonMLFactory({ username: 'brainhubeu' })(jsonML.content);

        const projects = [...this.state.bhProjects, ...teammatesProjects];
        return (
            <section className="tabs">
                <ul className="tabs__nav container">
                    <li>
                        <button className="tabs-nav__button active" data-category="all">All</button>
                    </li>
                    <li>
                        <button className="tabs-nav__button" data-category="bh">Brainhub's projects</button>
                    </li>
                    <li>
                        <button className="tabs-nav__button" data-category="teammates">Teammates projects</button>
                    </li>
                </ul>
                <div className="tabs-content__bg">
                    <ul className='tabs__content container'>
                        {projects.map(project =>
                            <li key={project.href} className='tabs-content__item' data-category={project.category}>
                                <a href={project.href}>
                                    <h3 className='tabs-content__header'>{project.name}</h3>
                                    <p>{project.desc}</p>
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </section>
        );
    }
}

export default Tabs;