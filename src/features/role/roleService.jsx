
import api from "../../api/axios";

export const createRole = async (data) => {
  return await api.post("/roles/create", data);
};

export const assignRole = async (data) => {
  return await api.post("/roles/assign", data);
};