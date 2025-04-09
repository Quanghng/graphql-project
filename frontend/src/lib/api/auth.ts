import axios, { AxiosError } from "axios";

const BASE_URL = "http://localhost:3333";

export async function registerUser(email: string, password: string) {
  try {
    const res = await axios.post(`${BASE_URL}/api/v1/auth/signup`, {
      email,
      password,
    },);
    const { tokens } = res.data;
    document.cookie = `jwt=${tokens}; path=/;`;
    console.log("Registration successful:", res.data);
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Something failed:",
      axiosError.response?.data || axiosError.message
    );
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const res = await axios.post(`${BASE_URL}/api/v1/auth/signin`, {
      email,
      password,
    });
    const { tokens } = res.data;
    document.cookie = `jwt=${tokens}; path=/;`;
    console.log("Login successful:", res.data);
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Something failed:",
      axiosError.response?.data || axiosError.message
    );
  }
}
