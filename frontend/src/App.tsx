import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SiglePost";
// import { useQuery } from "@apollo/client";
// import { graphql } from "./gql"; // ⚠️ 这里先注释掉，等后端启动后再打开

// WAIT for backend to be ready

// const GET_ARTICLES = graphql(`
//   query GetArticles {
//     articles {
//       id
//       title
//       author {
//         name
//       }
//       likes
//     }
//   }
// `);

// 假数据（Mock Data）
const mockData = [
  { id: "1", title: "Test Article 1", author: { name: "Alice" }, likes: 10 },
  { id: "2", title: "Test Article 2", author: { name: "Bob" }, likes: 5 },
];

function App() {
  // ⚠️ 这里注释掉 GraphQL 查询，等后端 OK 后再恢复
  // const { data, error, loading } = useQuery(GET_ARTICLES);

  // ⚠️ 直接用 `mockData` 代替 `data.articles`
  const articles = mockData;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/article/:articleId" element={<SinglePost />} />
  </Routes>
  );
}

export default App;
