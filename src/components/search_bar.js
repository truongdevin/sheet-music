import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTabs, setInstrument } from '../actions/index';

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { search: ""};
  }

  handleChange = (e) => {
    this.setState({ search: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.fetchTabs(this.state.search);
  }

  handleInstrument = (e) => {
    e.preventDefault();
    this.props.setInstrument(e.target.innerHTML);
  }

  renderInstrumentTabs = () => {

    if (this.props.instrument === "Guitar") {
      return (
        <div className="search-tab-flex" onClick={this.handleInstrument}>
          <div className="search-tab-item tab-selected">Guitar</div>
          <div className="search-tab-item">Piano</div>
        </div>
      );
    } else {
      return (
        <div className="search-tab-flex" onClick={this.handleInstrument}>
          <div className="search-tab-item">Guitar</div>
          <div className="search-tab-item tab-selected">Piano</div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="search-bar-container">
        {this.renderInstrumentTabs()}
        <form onSubmit={this.handleSubmit}>
          <input
            className="search-bar"
            type='text'
            placeholder="Enter artist or song name"
            value={this.state.search}
            onChange={this.handleChange} />
        </form>
      </div>
    );
  }
}

export default connect(null, { fetchTabs, setInstrument })(SearchBar);
