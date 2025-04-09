import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LikeButton from "@/components/LikeButton";
import CreatePost from "./CreatePost";
import { MessageCircle } from "lucide-react";
import CommentSection from "@/components/CommentSection";
import Layout from "@/components/Layout";
import { useGetPostsQuery } from '@/gql/generated';

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openComments, setOpenComments] = useState<string | null>(null);
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useGetPostsQuery();

  const handleLike = (postId: string) => {
    console.log("Like clicked for post", postId);
    // Optional: Add mutation for like
  };

  const handleAddComment = (postId: string, content: string) => {
    console.log("Comment added:", content);
    // Optional: Add mutation for comment
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 rounded-xl shadow-sm transition-colors">
        <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight mb-8 text-center">
          Recent Posts
        </h1>
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Search posts..."
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
          />
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full shadow hover:shadow-lg transition">
            🔍 Search
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.posts?.map((post: any) => (
            <Card
              key={post.id}
              className="hover:shadow-md transition duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <Link to={`/post/${post.id}`}>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {post.content.substring(0, 100)}...
                  </CardDescription>
                  <p className="text-sm text-muted-foreground mt-2 text-gray-600 dark:text-gray-300">
                    by {post.user.email}
                  </p>
                </CardContent>
              </Link>
              <div className="flex items-center justify-end gap-4 px-4 pb-4">
                <LikeButton
                  liked={false}
                  likesCount={post.likes}
                  onClick={() => handleLike(post.id)}
                />
                <button
                  onClick={() => setOpenComments(openComments === post.id ? null : post.id)}
                  className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments.length}</span>
                </button>
              </div>

              {openComments === post.id && (
                <CommentSection
                  postId={post.id}
                  comments={post.comments.map((c: any) => ({
                    id: c.id,
                    author: c.user.email,
                    content: c.content,
                  }))}
                  onAddComment={handleAddComment}
                />
              )}
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center pt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Ready to share your thoughts?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Join the conversation and publish your first post.
          </p>
          <Button
            onClick={() => setModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 text-lg rounded-full shadow hover:shadow-xl transition"
          >
            Post your post
          </Button>
        </div>
        <CreatePost open={modalOpen} onClose={() => setModalOpen(false)} refetchPosts={refetch} />
      </div>
    </Layout>
  );
};

export default Home;
