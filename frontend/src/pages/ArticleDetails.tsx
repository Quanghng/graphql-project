// import { useQuery } from "@apollo/client";
// import { graphql } from "../gql";
// import { useParams } from "react-router-dom";

// const GET_ARTICLE_DETAILS = graphql(`
//   query GetArticleDetails($id: ID!) {
//     article(id: $id) {
//       title
//       content
//       comments {
//         text
//         user {
//           name
//         }
//       }
//       likes
//     }
//   }
// `);

// function ArticleDetails() {
//   const { articleId } = useParams();
//   const { data, error, loading } = useQuery(GET_ARTICLE_DETAILS, {
//     variables: { id: articleId },
//   });

//   if (!data || loading) {
//     return <>Loading...</>;
//   }

//   if (error) return <>Error: {error.message}</>;

//   return (
//     <>
//       <h1>{data.article.title}</h1>
//       <p>{data.article.content}</p>
//       <h3>Comments</h3>
//     {data.article.comments.map((comment: { text: string; user: { name: string } }) => (
//       <p key={comment.text}>
//         <strong>{comment.user.name}:</strong> {comment.text}
//       </p>
//     ))}
//       <p>👍 {data.article.likes} Likes</p>
//     </>
//   );
// }

// export default ArticleDetails;



//----------------------------------------------//

import { useParams } from "react-router-dom";
// import { useQuery } from "@apollo/client";
// import { graphql } from "../gql"; // ⚠️ 这里先注释掉，等后端启动后再打开

// ⚠️ 这里的 GraphQL 查询等后端 OK 了再补
// const GET_ARTICLE_DETAILS = graphql(`
//   query GetArticleDetails($id: ID!) {
//     article(id: $id) {
//       title
//       content
//       comments {
//         text
//         user {
//           name
//         }
//       }
//       likes
//     }
//   }
// `);

// 假数据（Mock Data）
const mockData = {
  id: "1",
  title: "Test Article 1",
  content: "This is a placeholder content for the article.",
  comments: [
    { text: "Great post!", user: { name: "Alice" } },
    { text: "I totally agree!", user: { name: "Bob" } },
  ],
  likes: 15,
};

function ArticleDetails() {
  const { articleId } = useParams();
  
  // ⚠️ 这里注释掉 GraphQL 查询，等后端 OK 后再恢复
  // const { data, error, loading } = useQuery(GET_ARTICLE_DETAILS, {
  //   variables: { id: articleId },
  // });

  // ⚠️ 直接用 `mockData` 代替 `data.article`
  const article = mockData;

  return (
    <>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <h3>Comments</h3>
      {article.comments.map((comment) => (
        <p key={comment.text}>
          <strong>{comment.user.name}:</strong> {comment.text}
        </p>
      ))}
      <p>👍 {article.likes} Likes</p>
    </>
  );
}

export default ArticleDetails;
