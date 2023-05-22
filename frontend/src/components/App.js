import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import * as auth from "../utils/Auth";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePopup from "./DeletePopup";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isCardPopupOpen, setCardPopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [deleteCard, setDeleteCard] = useState(false);
  const [cardToDelete, setCardToDelete] = useState({ name: "", link: "" });

  const [isAuthSuccess, setIsAuthSuccess] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);

  const [popupText, setPopupText] = useState("");

  function handleAddPlaceSubmit(data) {
    setLoading(true);
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleUpdateUser(user) {
    setLoading(true);
    api
      .setUserInfo(user)
      .then((updateUser) => {
        setCurrentUser(updateUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setLoading(true);
    api
      .setUserAvatar(data)
      .then((updateAvatar) => {
        setCurrentUser(updateAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userInfo, result]) => {
          setCurrentUser(userInfo);

          setCards(result);
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    }
  }, [isLoggedIn]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  function handleCardDelete(card) {
    setLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setCardPopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  function handleDeleteCard(card) {
    setIsDeletePlacePopupOpen(true);
    setCardToDelete(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);

    setCardPopupOpen(false);

    setIsInfoTooltipPopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setCardToDelete({ name: "", link: "" });
  }

  const navigate = useNavigate();

  // useEffect(() => {
  //   tokenCheck();
  // }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setLoading(true);
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            api.getToken(token);
            setUserData({
              email: res.user.email,
            });
            setIsLoggedIn(true);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token]);

  // function tokenCheck() {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setLoading(true);
  //     auth
  //       .getContent(token)
  //       .then((res) => {
  //         if (res) {
  //           setUserData({
  //             email: res.data.email,
  //           });
  //           setIsLoggedIn(true);
  //           navigate("/");
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }
  // }

  function onLogin(email, password) {
    setLoading(true);
    auth
      .authorize(email, password)
      .then((data) => {
        // console.log(data.token);
        if (data.token) {
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
          setUserData({ email: email });
          navigate("/");
        }
      })
      .catch((err) => {
        setPopupText("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(err);
        setIsAuthSuccess(false);
        setIsInfoTooltipPopupOpen(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onRegister(email, password) {
    setLoading(true);
    auth
      .register(email, password)
      .then((data) => {
        if (data) {
          setPopupText("Вы успешно зарегистрировались!");
          setIsAuthSuccess(true);
          setIsInfoTooltipPopupOpen(true);
          navigate("/sign-in");
        }
      })
      .catch((err) => {
        setPopupText("Что-то пошло не так! Попробуйте ещё раз.");
        setIsAuthSuccess(false);
        setIsInfoTooltipPopupOpen(true);
        console.log("register", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleSignOut = useCallback(() => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserData({ email: "", password: "" });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__cover">
          <Header handleLogout={handleSignOut} email={userData.email} onSignOut={handleSignOut} />

          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  component={Main}
                  isLoggedIn={isLoggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteCard}
                  cards={cards}
                />
              }
            />
            <Route path="/sign-in" element={<Login loading={loading} onLogin={onLogin} />} />
            <Route
              path="/sign-up"
              element={<Register loading={loading} onRegister={onRegister} />}
            />
            <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/sign-in"} />} />
          </Routes>

          <Footer />

          <InfoTooltip
            message={popupText}
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isAuthSuccess={isAuthSuccess}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            loading={loading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            loading={loading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            loading={loading}
          />

          <ImagePopup
            isOpen={isCardPopupOpen}
            card={selectedCard}
            onClose={closeAllPopups}
            onButtonClose={closeAllPopups}
          />

          <DeletePopup
            isOpen={isDeletePlacePopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            loading={loading}
            card={cardToDelete}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
