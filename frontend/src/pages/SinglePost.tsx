import { useParams } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LikeButton from "@/components/LikeButton";
import Layout from "@/components/Layout";

const mockPost = {
  id: "1",
  content: "This is a mock post loaded locally.",
  likedByCurrentUser: false,
  likesCount: 3,
  comments: [
    { id: "c1", content: "Great post!", author: { username: "Alice" } },
    { id: "c2", content: "Interesting thoughts!", author: { username: "Bob" } },
  ],
};

const SinglePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(mockPost);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    setPost((prev) => ({
      ...prev,
      likedByCurrentUser: !prev.likedByCurrentUser,
      likesCount: prev.likedByCurrentUser ? prev.likesCount - 1 : prev.likesCount + 1,
    }));
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const newCom = {
      id: Date.now().toString(),
      content: newComment,
      author: { username: "You" },
    };
    setPost((prev) => ({
      ...prev,
      comments: [...prev.comments, newCom],
    }));
    setNewComment("");
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl shadow-md mt-10 space-y-6">
      <div className="text-xl font-semibold">{post.content}</div>
        <LikeButton
          liked={post.likedByCurrentUser}
          likesCount={post.likesCount}
          onClick={handleLike}
        />

        <form onSubmit={handleComment} className="flex gap-2">
          <Input
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button type="submit">Post</Button>
        </form>

        <div className="space-y-4">
          {post.comments.map((c) => (
            <div key={c.id} className="border-t border-gray-200 dark:border-gray-700 pt-2 text-sm">
              <strong className="text-gray-700 dark:text-gray-300">{c.author.username}:</strong>{" "}
              <span className="text-gray-800 dark:text-gray-100">{c.content}</span>
        </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SinglePost;
