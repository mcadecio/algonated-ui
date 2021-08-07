const apiHost = process.env.REACT_APP_FYP_SERVER_DOMAIN;

const post = (endpoint, body) => {
  return fetch(`${apiHost}${endpoint}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const get = (endpoint) => {
  return fetch(`${apiHost}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { post, get };
