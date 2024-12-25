import axiosInstance from "./axiosInstance";

export const login = async (credentials) => {
  const response = await axiosInstance.post("/v1/login", credentials);
  const token = response.data;

  localStorage.setItem("jwtToken", token);
  return token;
};

export const signup = async (credentials) => {
  const response = await axiosInstance.post("/v1/signup", credentials);
  return response;
};

export const logout = () => {
  localStorage.removeItem("jwtToken");
};
