import React from 'react';
const Picture = ({currentImg}) => {
  return (
    <div className="pictureBox">
      <img className="media" src={currentImg} alt="current-photo"/>
    </div>
  );
}

export default Picture;