class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Error: ${res.status}`);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.putLike(cardId) : this.deleteLike(cardId);
  }

  getUserInfo() {
    const url = `${this._baseUrl}/users/me`;
    return this._request(url, { headers: this._headers });
  }

  // editProfile(data) {
  //   const url = `${this._baseUrl}/users/me`;
  //   return this._request(url, {
  //     method: "PATCH",
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       name: data.name,
  //       about: data.about,
  //     }),
  //   });
  // }

  setUserInfo(data) {
    const url = `${this._baseUrl}/users/me`;
    return this._request(url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  addCard(data) {
    const url = `${this._baseUrl}/cards`;
    return this._request(url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  setUserAvatar(data) {
    const url = `${this._baseUrl}/users/me/avatar`;
    return this._request(url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  getInitialCards() {
    const url = `${this._baseUrl}/cards`;
    return this._request(url, { headers: this._headers });
  }

  deleteCard(id) {
    const url = `${this._baseUrl}/cards/${id}`;
    return this._request(url, { method: "DELETE", headers: this._headers });
  }

  putLike(id) {
    const url = `${this._baseUrl}/cards/${id}/likes`;
    return this._request(url, { method: "PUT", headers: this._headers });
  }

  deleteLike(id) {
    const url = `${this._baseUrl}/cards/${id}/likes`;
    return this._request(url, { method: "DELETE", headers: this._headers });
  }

  _request(url, options) {
    return fetch(url, options).then(this._handleResponse);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "3efa0f75-3ec0-4a4a-b91a-ae0ce506bb2e",
    "Content-Type": "application/json",
  },
});

export default api;
