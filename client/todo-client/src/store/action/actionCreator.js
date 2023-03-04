const baseUrl = "http://localhost:4000/";

export const registerSuccess = (payload) => {
  return {
    type: "register/success",
    payload,
  };
};

export const register = (payload) => {
  return (dispatch) => {
    {
      return fetch(`${baseUrl}register`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.message) {
            throw new Error("Account have been used!");
          }

          dispatch(registerSuccess(data));
        })
        .catch((error) => {
          throw error;
        });
    }
  };
};

export const login = (payload) => {
  return (dispatch, getState) => {
    return fetch(`${baseUrl}login`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error("invalid email/password");
      })
      .then((data) => {
        console.log(data);
        localStorage.access_token = data.access_token;
      })
      .catch((error) => {
        throw error;
      });
  };
};

const fetchCategoriesSuccess = (payload) => {
  return {
    type: "fetchCategories/success",
    payload,
  };
};

export const fetchCategories = (payload) => {
  return (dispatch) => {
    return fetch(`${baseUrl}categories`, {
      headers: {
        access_token: localStorage.access_token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("error");
      })
      .then((data) => {
        console.log(data, "ini category di creator");
        dispatch(fetchCategoriesSuccess(data));
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };
};

const fetchTasksSuccess = (payload) => {
  return {
    type: "fetchTasks/success",
    payload,
  };
};

export const fetchTask = (payload) => {
  return (dispatch) => {
    return fetch(`${baseUrl}tasks`, {
      headers: {
        access_token: localStorage.access_token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("error");
      })
      .then((data) => {
        console.log(data, "ini task di creator");
        dispatch(fetchTasksSuccess(data));
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };
};

export const updateTask = (id) => {
  return (dispatch) => {
    return fetch(`${baseUrl}task/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
    })
      .then((response) => {
        // if (response.ok) {
        return response.json();
        // }

        // throw new Error(response.statusText);
      })
      .then((data) => {
        console.log("Success:", data);
        dispatch(fetchTask());
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
};

const addCategorySuccess = (payload) => {
  return {
    type: "addCategory/success",
    payload,
  };
};

export const addCategory = (payload) => {
  return (dispatch) => {
    return fetch(`${baseUrl}category`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(addCategorySuccess(data));
      })
      .catch((error) => {
        throw error;
      });
  };
};

const addTaskSuccess = (payload) => {
  return {
    type: "addTask/success",
    payload,
  };
};

export const addTask = (payload) => {
  return (dispatch) => {
    console.log(payload);
    return fetch(`${baseUrl}task`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(addTaskSuccess(data));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const deleteTaskById = (id) => {
  return (dispatch) => {
    console.log(id);
    return fetch(`${baseUrl}task/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
    });
  };
};
