import React from 'react';

class Import extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    if (this.state.value === '') {
      this.props.retrieveImport([]);
    } else {
      var importList = this.state.value.split('\n');
      var list = importList.map((card) => {
        var count;
        if (card[0] !== ' ' && !Number.isNaN(+card[0])) {
          var strNumb = '';
          var index;
          for (var i = 0; i < card.length; i++) {
            if (card[i] === ' ' || Number.isNaN(+card[0])) {
              index = i;
              card = card.slice(index + 1)
              break;
            } else {
              strNumb += card[i];
            }
          }
          count = Number(strNumb);
        } else {
          count = 1;
        }
        return {count: count, card: card.trim()};
      })
      this.props.retrieveImport(list);
    }
  }

  render() {
    return (
      <div className="importWrapper">
        <label>Import</label>
        <textarea className="import" value={this.state.value} onChange={this.handleChange}></textarea>
        <button className="importBtn" onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default Import;