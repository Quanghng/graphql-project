import { Link } from "react-router-dom";
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
    <>
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <Link to={`/article/${article.id}`} key={article.id}>
            <li>
              <h2>{article.title}</h2>
              <p>By {article.author.name}</p>
              <p>👍 {article.likes} Likes</p>
            </li>
          </Link>
        ))}
      </ul>
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
    </>
  );
}

export default App;
