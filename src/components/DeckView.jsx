import React, { useState, useRef, useEffect } from 'react';

const DeckView = ({ deckList, getHover, getCommander, tagCount, changeCategory, removeCard, options, showOptions }) => {

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
                  <tbody key={index} onClick={() => {showOptions(); changeClickedCard(`${card.name}`)}} onMouseEnter={() => getHover(card["image_uris"].normal)}>
                    <tr>
                      <td>
                        {card.count}x {card.name}
                        {options && clickedCard === card.name ? <div className="options">
                            <span className="s_op" onClick={() => {showOptions(); changeCategory(tag, 'Commander', card, index)}}>Make Commander</span>
                            <span className="s_op" onClick={() => {showOptions(); changeCategory(tag, 'Board Wipes', card, index)}}>Add To Board Wipe</span>
                            <span className="s_op" onClick={() => {showOptions(); changeCategory(tag, 'Card Draw', card, index)}}>Add To Card Draw</span>
                            <span className="s_op" onClick={() => {showOptions(); changeCategory(tag, 'Enabler', card, index)}}>Add To Enablers</span>
                            <span className="s_op" onClick={() => {showOptions(); changeCategory(tag, 'Enhancer', card, index)}}>Add To Enhancers</span>
                            <span className="s_op" onClick={() => {showOptions(); changeCategory(tag, 'Lands', card, index)}}>Add To Land</span>
                            <span className="s_op" onClick={() => {showOptions(); changeCategory(tag, 'Ramp', card, index)}}>Add To Ramp</span>
                            <span className="s_op" onClick={() => {showOptions(); changeCategory(tag, 'Single Target Removal', card, index)}}>Add To Single Target Removal</span>
                            <span className="s_op" onClick={() => {showOptions(); changeCategory(tag, 'Standalone', card, index)}}>Add To Standalone</span>
                            <span className="s_op" onClick={() => {showOptions(); changeCategory(tag, 'Untagged', card, index)}}>Remove Tag</span>
                            <span className="s_op" onClick={() => {showOptions(); removeCard(tag, index)}}>Remove Card</span>
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