import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, loading }) {
  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    if (isOpen) {
      setTitle("");
      setLink("");
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: title,
      link: link,
    });
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleLinkChange(event) {
    setLink(event.target.value);
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={loading ? "Добавление..." : "Добавить"}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input popup__input-place"
        placeholder="Название"
        maxLength="30"
        minLength="2"
        name="name"
        id="place-input"
        required
        value={title}
        onChange={handleTitleChange}
      />
      <span className="popup__form-error place-input-error"></span>
      <input
        type="url"
        className="popup__input popup__input-picture"
        placeholder="Ссылка на картинку"
        maxLength="300"
        minLength="3"
        name="link"
        id="picture-input"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span className="popup__form-error picture-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
