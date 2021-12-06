import React from 'react';
import Title from './components/Title.jsx';
import FindCards from './components/FindCards.jsx';
import ImportModal from './components/ImportModal.jsx';
import Picture from './components/Picture.jsx';
import DeckView from './components/DeckView.jsx';
const axios = require('axios');

class Decklist extends React.Component {
  constructor() {
    super();
    this.state = {
      deckList: {
        'Untagged': [],
        'Ramp': [],
        'Card Draw': [],
        'Single Target Removal': [],
        'Board Wipes': [],
        'Lands': [],
        'Standalone': [],
        'Enhancer': [],
        'Enabler': [],
        'Commander': [],
      },
      tagCount: {
        'Untagged': 0,
        'Ramp': 0,
        'Card Draw': 0,
        'Single Target Removal': 0,
        'Board Wipes': 0,
        'Lands': 0,
        'Standalone': 0,
        'Enhancer': 0,
        'Enabler': 0,
        'Commander': 0,
      },
      count: 0,
      commander: {},
      currentImg: 'https://c1.scryfall.com/file/scryfall-cards/large/front/a/b/abe8eefe-c9f8-43f7-a348-8afee8b0ec68.jpg?1595719605',
      playtest: false,
      importCards: false,
      options: false,
    };

    this.getCard = this.getCard.bind(this);
    this.addCard = this.addCard.bind(this);
    this.retrieveImport = this.retrieveImport.bind(this);
    this.changeRender = this.changeRender.bind(this);
    this.getCommander = this.getCommander.bind(this);
    this.getHover = this.getHover.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.showOptions = this.showOptions.bind(this);
  }

  getCard(e) {
    var card = e.target.innerText;
    card = card.replaceAll(' ', '+');
    axios.get(`/exact/${card}`)
      .then((obj) => {
        this.addCard(obj);
      })
      .catch(() => {
        alert(`Couldn\'t add ${e.target.innerText}, try again.`);
      });
  }

  addCard(obj) {
    var { deckList, count, tagCount } = this.state;
    var tempArray = deckList.Untagged;
    var found = false;
    for (var i = 0; i < tempArray.length; i++) {
      if (tempArray[i].name === obj.data.name) {
        tempArray[i].count++;
        found = true;
        break;
      }
    }
    if (!found) {
      obj.data.count = 1;
      obj.data.tag = 'Untagged';
      tempArray.push(obj.data);
    }
    var temp = deckList;
    temp.Untagged = tempArray;
    var tempC = tagCount;
    tempC.Untagged = tagCount.Untagged + 1;
    this.setState({
      deckList: temp,
      tagCount: tempC,
      count: count + 1,
    });
  }

  retrieveImport(list) {
    var { importCards } = this.state;
    var e = { target: { innerText: '' } };
    list.forEach((obj) => {
      for (var i = 0; i < obj.count; i++) {
        e.target.innerText = obj.card;
        this.getCard(e);
      }
    });
    this.setState({
      importCards: !importCards
    });
  }

  changeRender(state) {
    this.setState({
      [state]: !this.state[state]
    });
  }

  getCommander(obj) {
    this.setState({ commander: obj });
  }

  getHover(str) {
    this.setState({ currentImg: str });
  }

  changeCategory(prev, cat, card, index) {
    var { tagCount, deckList } = this.state;
    var temp = { ...tagCount };
    temp[cat] += 1;
    temp[prev] -= 1;
    var tags = { ...deckList };
    console.log(tags);
    tags[cat].push(card);
    if (index === 0) {
      tags[prev] = tags[prev].slice(index + 1);
    } else {
      tags[prev] = tags[prev].slice(0, index).concat(tags[prev].slice(index + 1));
    }
    console.log(tags);
    this.setState({
      tagCount: temp,
      deckList: tags,
    });
  }

  removeCard(tag, index) {
    var { tagCount, deckList } = this.state;
    var temp = { ...tagCount };
    temp[tag] -= 1;
    var tags = { ...deckList };
    if (index === 0) {
      tags[tag] = tags[tag].slice(index + 1);
    } else {
      tags[tag] = tags[tag].slice(0, index).concat(tags[tag].slice(index + 1));
    }
    this.setState({
      tagCount: temp,
      categories: tags,
    });
  }

  showOptions() {
    this.setState({ options: !this.state.options })
  }

  render() {
    var { deckList, count, playtest, importCards, currentImg, tagCount, options } = this.state;
    if (playtest) {
      return
    } else if (importCards) {
      return <ImportModal retrieveImport={this.retrieveImport} />
    } else {
      return (
        <div className="col-2-5">
          <div className="header" >
            <span>Login</span>
            <div id="firebaseui-auth-container"></div>
            <div id="loader">Loading...</div>
          </div>
          <div className="deckContainer">
            <Title />
            <div className="row-2">
              <a className="playTestBtn">Play Test</a>
              <div className="wrapper">
                <a className="importBtn" onClick={() => this.changeRender('importCards')}>Import</a>
                <FindCards getCard={this.getCard} />
              </div>
            </div>
            <div className="row-4">
              <Picture currentImg={currentImg} />
              <DeckView deckList={deckList} getHover={this.getHover} getCommander={this.getCommander} tagCount={tagCount} changeCategory={this.changeCategory} removeCard={this.removeCard} options={options} showOptions={this.showOptions} />
            </div>
          </div>
          <div className="deckStats">

          </div>
          <footer className="footer">
            <span >Cards: {count}</span>
          </footer>
        </div>
      );
    }
  }
}

export default Decklist;