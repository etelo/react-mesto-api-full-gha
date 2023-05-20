import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, loading }) {
  const ref = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: ref.current.value });
  }

  useEffect(() => {
    ref.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={loading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="popup__input popup__input-avatar"
        placeholder="Ссылка на аватар"
        minLength="3"
        maxLength="300"
        name="avatar"
        id="avatar-input"
        required
        ref={ref}
      />
      <span className="popup__form-error avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
