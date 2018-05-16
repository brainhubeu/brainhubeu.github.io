import React, { PureComponent } from 'react';
import axios from 'axios';
import base64 from 'base-64';
import classnames from 'classnames';
import parseJsonMLFactory from '../helpers/parseJsonMLFactory';
import { Parser } from 'mark-to-jsonml';
import debounce from 'lodash.debounce';

class Tabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      _asyncRequest: null,
      bhProjects: [],
      readme: null,
      activeCategory: 'all',
    };

    this.filter = debounce(this.filter.bind(this), 300);
    this.changeActiveCategory = this.changeActiveCategory.bind(this);
    this.tabsContent = React.createRef();
  }

  componentDidMount() {
    axios.get('https://api.github.com/users/brainhubeu/repos')
      .then(response => {
        this.setState({
          bhProjects: response.data.map(repo => ({
            category: 'bh',
            name: repo.name,
            href: repo.html_url,
            desc: repo.description,
          })),
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    axios.get('https://api.github.com/repos/brainhubeu/brainhubeu.github.io/readme')
      .then(response => {
        this.setState({
          readme: base64.decode(response.data.content),
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    window.addEventListener('resize', this.filter);
    this.filter();

    window.addEventListener('load', this.filter);
  }

  changeActiveCategory(e) {
    this.setState({
      activeCategory: e.target.dataset.category,
    });
    this.filter();
  }

  setStylesForItems(visibleItems, margin, itemsInOneLine) {
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

    this.tabsContent.current.style.height = `${top + maxHeight + margin}px`;
  }

  filter() {
    const margin = 16; // equal 1rem
    const rwdBreakpoint = 768;
    const itemsInOneLine = window.innerWidth <= rwdBreakpoint ? 1 : 2;

    const allItems = [...this.tabsContent.current.children];

    const visibleItems = allItems.filter(item => this.state.activeCategory === 'all' || item.dataset.category === this.state.activeCategory);
    const hiddenItems = this.state.activeCategory !== 'all' ? allItems.filter(item => item.dataset.category !== this.state.activeCategory) : [];

    hiddenItems.forEach(element => element.style.cssText = 'display: none');

    this.setStylesForItems(visibleItems, margin, itemsInOneLine);
  }

  render() {
    const parser = new Parser({ parseToc: true });
    const parsed = this.state.readme && parser.parse(this.state.readme);

    const teammatesProjects = parsed ? parseJsonMLFactory({ username: 'brainhubeu' })(parsed) : [];

    const projects = [...this.state.bhProjects, ...teammatesProjects];
    return (
      <section className="tabs">
        <ul className="tabs__nav container">
          <li>
            <button
              className={classnames('tabs-nav__button', this.state.activeCategory === 'all' ? 'active' : null)}
              data-category="all"
              onClick={this.changeActiveCategory}
            >
              All
            </button>
          </li>
          <li>
            <button
              className={classnames('tabs-nav__button', this.state.activeCategory === 'bh' ? 'active' : null)}
              data-category="bh"
              onClick={this.changeActiveCategory}
            >
              {`Brainhub's projects`}
            </button>
          </li>
          <li>
            <button
              className={classnames('tabs-nav__button', this.state.activeCategory === 'teammates' ? 'active' : null)}
              data-category="teammates"
              onClick={this.changeActiveCategory}
            >
              Teammates projects
            </button>
          </li>
        </ul>
        <div className="tabs-content__bg">
          <ul
            className="tabs__content container"
            ref={this.tabsContent}
          >
            {projects.map(project =>
              <li
                key={project.href}
                className="tabs-content__item"
                data-category={project.category}
              >
                <a href={project.href}>
                  <h3 className="tabs-content__header">{project.name}</h3>
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
