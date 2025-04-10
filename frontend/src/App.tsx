import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleThread from "./pages/SingleThread";
import MyThreads from "./pages/MyThread";


function App() {
  
  useEffect(() => {
    const dark = localStorage.getItem("darkMode") === "true";
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/thread/:threadId" element={<SingleThread />} />
        <Route path="/mythreads" element={<MyThreads />} />

      </Routes>
    </>
  );
}

export default App;
