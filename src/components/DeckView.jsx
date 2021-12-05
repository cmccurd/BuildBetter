import React, { useState, useRef, useEffect } from 'react';

const DeckView = ({ deckList, getHover, getCommander, tagCount, changeCategory }) => {

  const [options, showOptions] = useState(false);
  const [clickedCard, changeClickedCard] = useState('');

  var keys = Object.keys(tagCount);

  return (
    <div className="deckview">
      <div className="deckview-columns">
        {keys.map((tag) => {
          if (tagCount.Untagged === 0 && tag === 'Untagged') {
            return;
          }
          return (
            <table key={tag}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left" }}>{tag} ({tagCount[tag]})</th>
                </tr>
              </thead>
              {deckList[tag].map((card, index) => {
                return (
                  <tbody key={index} onClick={() => {showOptions(true); changeClickedCard(`${card.name}`)}} onMouseEnter={() => getHover(card["image_uris"].normal)}>
                    <tr>
                      <td>
                        {card.count}x {card.name}
                        {options && clickedCard === card.name ? <div className="options">
                            <span style={{ display: 'block' }} onClick={() => {showOptions(false); changeCategory(tag, 'Commander', card, index)}}>Make Commander</span>
                            <span style={{ display: 'block' }} onClick={() => {showOptions(false); changeCategory(tag, 'Commander', card, index)}}>Add To Single Target Removal</span>
                          </div> : null}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          );
        })}

      </div>
    </div>
  );
}

export default DeckView;