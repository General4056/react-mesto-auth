class Api {
  constructor({ url, token }) {
    this._url = url;
    this._token = token;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }).then((res) => this._checkRes(res));
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }).then((res) => this._checkRes(res));
  }

  sendUserData(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: '460c475c-066c-4a3d-9688-fa7d2d4801d1',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then((res) => this._checkRes(res));
  }

  sendNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then((res) => this._checkRes(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }).then((res) => this._checkRes(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        }
      }).then((res) => this._checkRes(res));
    } else {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        }
      }).then((res) => this._checkRes(res));
    }
  }

  updateAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    }).then((res) => this._checkRes(res));
  }
}

export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-28',
  token: '460c475c-066c-4a3d-9688-fa7d2d4801d1'
});
