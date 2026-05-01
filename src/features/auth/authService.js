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