import React from 'react';

class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isText: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.editName = this.editName.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.editName();
  }

  editName() {
    this.setState({isText: !this.state.isText});
  }

  render() {
    var { value, isText } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {!isText ?
          <>
            <div className="shadow" onClick={this.handleSubmit}></div>
            <input className="editName" value={value} onChange={this.handleChange}/>
          </> : <span className="displayName" onClick={this.editName}>{value ? value : 'Deck Name'}</span>}
        </label>
      </form>
    );
  }
}

export default Title;