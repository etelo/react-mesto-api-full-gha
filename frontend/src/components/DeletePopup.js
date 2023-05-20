import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePopup({ isOpen, onClose, onCardDelete, card, loading }) {
  function handleSubmit(e) {
    e.preventDefault();

    onCardDelete(card);
  }

  return (
    <PopupWithForm
      name="add"
      title="Вы уверены?"
      buttonText={loading ? "Удаление..." : "Да"}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    ></PopupWithForm>
  );
}

export default DeletePopup;
