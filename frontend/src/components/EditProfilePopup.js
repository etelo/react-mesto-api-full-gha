import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, loading }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={loading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            type="text"
            className="popup__input popup__input-name"
            maxLength="40"
            minLength="2"
            name="name"
            placeholder="Имя"
            id="name-input"
            value={name || ""}
            onChange={handleNameChange}
            required
          />
          <span className="popup__form-error name-input-error"></span>
          <input
            type="text"
            className="popup__input popup__input-about"
            maxLength="200"
            minLength="2"
            name="about"
            placeholder="Работа"
            id="about-input"
            value={description || ""}
            onChange={handleDescriptionChange}
            required
          />
          <span className="popup__form-error about-input-error"></span>
        </>
      }
    />
  );
}

export default EditProfilePopup;
