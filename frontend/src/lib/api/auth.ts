import axios from "axios";

const BASE_URL = "http://localhost:3333"; 

export async function registerUser(email: string, password: string) {
  const res = await axios.post(`${BASE_URL}/api/v1/auth/signup`, {
    email,
    password,
  });

  return res.data; 
}

export async function loginUser(email: string, password: string) {
  const res = await axios.post(`${BASE_URL}/api/v1/auth/signin`, {
    email,
    password,
  });

  return res.data;
}
