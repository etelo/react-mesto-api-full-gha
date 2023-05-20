import React from "react";

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_image ${isOpen && "popup_opened"}`}>
      <div className="popup__image-container">
        <button
          aria-label="закрыть"
          type="button"
          className="popup__close-btn popup__image-closed"
          onClick={onClose}
        ></button>
        <img src={card.link} alt={card.name} className="popup__image-img" />
        <h2 className="popup__image-txt">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
