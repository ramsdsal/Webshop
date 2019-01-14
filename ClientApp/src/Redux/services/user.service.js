export const userService = {
  login,
  logout,
  favorits
};

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Email: username, Password: password })
  };

  return fetch("api/user/authenticate", requestOptions)
    .then(handleResponse)
    .then(res => {
      if (res) {
        localStorage.setItem("user", JSON.stringify(res));
        return res;
      }
    });
}
function favorits(id) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch("api/favorit/" + id, requestOptions)
    .then(handleResponse)
    .then(data => {
      return data;
    })
    .catch(error => console.log(error.msg));
}

function logout() {
  localStorage.removeItem("user");
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if (response.status === 401) {
      }

      const error = (data && data.message && data.msg) || response.statusText;

      return Promise.reject(data.message);
    }

    return data;
  });
}
