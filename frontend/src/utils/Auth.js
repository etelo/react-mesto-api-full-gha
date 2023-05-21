const baseURL = "https://api.hello2023.nomoredomains.monster";

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
}

export function register(email, password) {
  return fetch(`${baseURL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}

export function authorize(email, password) {
  return fetch(`${baseURL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}

export function getContent(token) {
  return fetch(`${baseURL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDZhNGFjYmIyN2M0OTRlZWNmZmNlOTkiLCJpYXQiOjE2ODQ2ODc1NzcsImV4cCI6MTY4NTI5MjM3N30.75FOux8fXfZRCtamgpbknirwNkskAwlrYDWTyR7dGeM`,
    },
  }).then(handleResponse);
}
