import React from "react";
import { useEffect } from "react";

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  buttonText,
  onSubmit,
}) {
  function handleEscClose(evt) {
    evt.key === "Escape" && onClose();
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  });

  return (
    <div
      className={`popup popup_type_${name} ` + (isOpen ? "popup_opened" : ` `)}
      onClick={onClose}
    >
      <div
        className="popup__container"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          aria-label="закрыть"
          type="button"
          className="popup__close-btn"
          onClick={onClose}
        ></button>
        <p className="popup__title">{title}</p>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__button-submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
