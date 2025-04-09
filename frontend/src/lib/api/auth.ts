// src/lib/api/auth.ts

import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "http://localhost:3333";

interface JwtPayload {
  sub: number;
  email: string;
  exp: number;
  iat: number;
}

export async function registerUser(email: string, password: string) {
  try {
    const res = await axios.post(`${BASE_URL}/api/v1/auth/signup`, { email, password });
    const { accessToken, refreshToken } = res.data;
    const decoded = jwtDecode<JwtPayload>(accessToken);
    const userId = decoded.sub;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userId", userId.toString());
    localStorage.setItem("isLoggedIn", "true");

    console.log("Registration successful:", res.data);
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Something failed:", axiosError.response?.data || axiosError.message);
    throw error; 
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const res = await axios.post(`${BASE_URL}/api/v1/auth/signin`, { email, password });
    const { accessToken, refreshToken } = res.data;

    const decoded = jwtDecode<JwtPayload>(accessToken);
    const userId = decoded.sub;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userId", userId.toString());
    localStorage.setItem("isLoggedIn", "true");

    console.log("Login successful:", res.data);
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Something failed:", axiosError.response?.data || axiosError.message);
    throw error;
  }
}
