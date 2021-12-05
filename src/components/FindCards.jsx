import React from 'react';
const axios = require('axios');
import DropSelector from './DropSelector.jsx';

class FindCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      changes: false,
      suggestions: [],
      showSuggestions: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.timer = this.timer.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.close = this.close.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      counter: 1,
    });
    this.timer();
  }

  timer() {
    var { changes, counter } = this.state;
    if (!changes) {
      this.setState({ changes: true });
      var id = setInterval(() => {
        if (counter > 0) {
          counter--;
        } else {
          this.handleSubmit();
          this.setState({ changes: false });
          clearInterval(id);
        }
      }, 200);
    }
  }

  handleSubmit() {
    const name = this.state.value;
    if (name !== '') {
      axios.get(`/find/${name}`)
        .then((list) => {
          this.setState({
            suggestions: list.data,
            showSuggestions: true,
          })
        });
    }
  }

  close() {
    this.setState({
      value: ''
    });
  }

  clearSearch() {
    this.setState({ value: '', suggestions: [] });
  }

  render() {
    const { suggestions, showSuggestions, value } = this.state;
    return (
      <label className="search">
        <input className="search-input" type="text" placeholder="Find cards..." value={this.state.value} onChange={this.handleChange} />
        {value !== '' ?
        <>
        <div className="shadow" onClick={this.close}></div>
        <DropSelector list={suggestions} getCard={this.props.getCard} clearSearch={this.clearSearch} />
        </>: null}
      </label>
    );
  }
}

export default FindCards;