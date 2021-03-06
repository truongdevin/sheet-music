import React, { Component } from 'react';
import { hashHistory } from 'react-router';

export default class MusicList extends Component {
  constructor(props) {
    super(props);
    this.state = { scrollCount: 1 };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll, false);
  }

  handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.setState({ scrollCount:  this.state.scrollCount += 1 });
    }
  }

  renderMusicList() {
    if (this.props.instrument === "Guitar") {
      return this.renderGuitarList();
    }

    if (this.props.instrument === "Piano") {
      return this.renderPianoList();
    }
  }

  renderGuitarList() {
    return this.props.tabs.slice(0,this.state.scrollCount*5).map((tab) => {
      const { id, name, artist, rating, url } = tab.$;
      return (
        <li key={id}
          className='list-item'
          onClick={() => hashHistory.push({
            pathname: '/guitar/'+id,
            state: { name, artist }
          })}>
          <div>{name} - {artist}</div>
          <div> Rating: {rating}</div>
        </li>
      );
    });
  }

  renderPianoList() {
    return this.props.tabs.slice(0,this.state.scrollCount*5).map((tab) => {
      const { id, title, permalink, view_count } = tab;
      return (
        <li key={id}
          className='list-item'
          onClick={() => hashHistory.push({
            pathname: '/piano/'+id,
            state: { title }
          })}>
          <div>{title}</div>
          <div> Views: {view_count}</div>
        </li>
      );
    });
  }


  render() {
    if (this.props.tabs === null) {
      return <div/>;
    } else if (this.props.tabs === undefined) {
      return (
        <ul className='list-container fadedown'>
          <li className='list-item' />
        </ul>
      );
    } else {
      return (
        <ul className="list-container slideup">
          {this.renderMusicList()}
        </ul>
      );
    }
  }
}
