import api from "../../api/axios";

// REGISTER USER
export const registerUser = async (data) => {
  return await api.post("/auth/register",data, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
};

//login user
export const loginUser = async (data) => {
  return await api.post("/auth/login", data, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
};



// ✅ GET USER BY USERNAME
export const getUserByUsername = async (username) => {
  return await api.get(`/users/${username}`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
};

// ✅ GET CURRENT LOGGED IN USER
export const getCurrentUser = async () => {
  return await api.get("/users/currentLoggedInUser", {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
};

// ✅ (OPTIONAL) GET ALL USERS (only if backend supports it)
export const getAllUsers = async () => {
  return await api.get("/users", {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
};