import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import MyThreads from "./pages/MyThread";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Post/:PostId" element={<SinglePost />} />
        <Route path="/mythreads" element={<MyThreads />} />
      </Routes>
    </>
  );
}

export default App;
