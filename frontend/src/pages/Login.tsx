import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { gql, useMutation } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    try {
      const { data } = await login({ variables: { email, password } });
      if (data?.login?.accessToken) {
        localStorage.setItem("accessToken", data.login.accessToken);
        localStorage.setItem("refreshToken", data.login.refreshToken);
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-10 
        bg-white dark:bg-gray-800 
        text-gray-900 dark:text-gray-100 
        border border-gray-200 dark:border-gray-700 
        rounded-xl shadow-md mt-12 transition-colors">

        <h1 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-6">🔐 Login</h1>
        <div className="space-y-4">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
          />
          {error && <p className="text-red-500 text-sm">Login error: {error.message}</p>}
          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-4">
            Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
