import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login with:", values);

    axios.defaults.withCredentials = true;
    try {
      const signupRes = await axios.post(
        // Endpoint
        "http://localhost:3333/api/v1/auth/signin",
        // Data
        {
          email: values.email,
          password: values.password,
        },
      );

      const { tokens } = signupRes.data;
      document.cookie = `jwt=${tokens}; path=/;`;
      console.log("Login successful:", signupRes.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(
        "Something failed:",
        axiosError.response?.data || axiosError.message
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={values.email} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" value={values.password} onChange={handleChange} required />
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </form>
          <p className="mt-4 text-center text-sm">
            New here? <Link to="/register" className="underline">Register</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
