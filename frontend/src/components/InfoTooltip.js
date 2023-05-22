import imgSuccess from "../images/singUp-success.png";
import imgFail from "../images/singUp-fail.png";

function InfoTooltip({ isOpen, onClose, isAuthSuccess, message }) {
  const messageSuccess = "Вы успешно зарегистрировались!";
  const messageError = "Что-то пошло не так! Попробуйте ещё раз.";

  return (
    <div
      className={`popup popup_type_tooltip ${isOpen && "popup_opened"}`}
      onClick={onClose}
    >
      <div className="popup__container">
        <div className="popup__img-container">
          <button
            onClick={onClose}
            className="popup__close-btn"
            type="button"
            aria-label="Закрыть окно"
          />
          <img
            className="popup__img-tooltip"
            src={isAuthSuccess ? imgSuccess : imgFail}
            alt={isAuthSuccess ? messageSuccess : messageError}
          />
          <p className="popup__img-caption">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
