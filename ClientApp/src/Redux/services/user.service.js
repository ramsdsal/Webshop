export const userService = {
  login,
  logout
};

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Email: username, Password: password })
  };

  return fetch("api/user/authenticate", requestOptions)
    .then(handleResponse)
    .then(user => {
      if (user[0].token) {
        localStorage.setItem("user", JSON.stringify(user[0]));
      }

      return user[0];
    })
    .catch(error => console.log(error));
}

function logout() {
  localStorage.removeItem("user");
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
