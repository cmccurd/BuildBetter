import React from 'react';
const DropSelector = ({list, getCard, clearSearch}) => {
  return (
    <div className="autocom-box">
      {list.map((item, index) => <li key={index} onClick={(e) => {getCard(e); clearSearch();}}>{item}</li>)}
    </div>
  );
}

export default DropSelector;