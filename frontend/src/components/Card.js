import React from "react";
import trashCan from "../images/Trash.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like ${isLiked && "element__like_active"}`;

  const cardDeleteButtonClassName = `element__delete ${isOwn && "element__delete-active"}`;

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleCardClick = () => {
    onCardClick(card);
  };

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      {isOwn && (
        <button
          src={trashCan}
          aria-label="удалить"
          type="button"
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
        ></button>
      )}
      <img src={card.link} alt={card.name} className="element__image" onClick={handleCardClick} />
      <div className="element__description">
        <p className="element__title">{card.name}</p>
        <div className="element__like-wrapper">
          <button
            aria-label="лайк"
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-counter"> {card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
