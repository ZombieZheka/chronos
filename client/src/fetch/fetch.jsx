import Swal from "sweetalert2";

const Url = process.env.REACT_APP_API_URL;

export const fetchNoToken = (endpoint, data, method = "GET") => {
  const url = `${Url}/${endpoint}`;
  //Swal.fire(url);
  if (method === "GET") {
    //Swal.fire(url);
    return fetch(url);
  } else {
    //Swal.fire("Post");
    return fetch(url, {method,
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(data)});
  }
};
export const fetchWithToken = (endpoint, data, method = "GET") => {
  const url = `${Url}/${endpoint}`;
  const token = localStorage.getItem("token") || "";

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["x-token"] = token;
  }

  const requestOptions = {
    method,
    headers,
  };

  if (method !== "GET") {
    requestOptions.body = JSON.stringify(data);
  }

  return fetch(url, requestOptions);
};

