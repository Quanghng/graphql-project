import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetUserWithThreadsQuery } from "@/gql/generated";
import Layout from "@/components/Layout";
import LikeButton from "@/components/LikeButton";
import CommentSection from "@/components/CommentSection";
import { MessageCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

const MyThreads = () => {
  const userId = Number(localStorage.getItem("userId")); 
  const { data, loading, error, refetch } = useGetUserWithThreadsQuery({
    variables: { id: userId },
  });

  const [openComments, setOpenComments] = useState<number | null>(null);

  const handleLike = (threadId: number) => {
    console.log("Liked thread", threadId);
    // TODO: Add mutation here
  };

  const handleAddComment = (threadId: number, content: string) => {
    console.log("Add comment to thread", threadId, ":", content);
    // TODO: Add mutation here
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  const user = data?.getUser;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 rounded-xl shadow-sm transition-colors mt-10">
        <div className="mb-10 border-b border-gray-300 dark:border-gray-700 pb-6">
          <h2 className="text-3xl font-bold mb-2 text-blue-700 dark:text-blue-300">👤 My Profile</h2>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>First Name:</strong> {user?.firstName || "—"}</p>
          <p><strong>Last Name:</strong> {user?.lastName || "—"}</p>
        </div>

        <h2 className="text-3xl font-extrabold mb-6 text-indigo-700 dark:text-indigo-300">🧵 My Threads</h2>
        {user?.getThreads?.length === 0 ? (
          <p className="text-gray-500">You haven’t posted anything yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user?.getThreads?.map((thread) => (
              <Card
                key={thread.id}
                className="hover:shadow-md transition duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <Link to={`/post/${thread.id}`}>
                  <CardHeader>
                    <CardTitle>{thread.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {thread.content.substring(0, 100)}...
                    </CardDescription>
                    <p className="text-sm text-muted-foreground mt-2 text-gray-600 dark:text-gray-300">
                      by you
                    </p>
                  </CardContent>
                </Link>
                <div className="flex items-center justify-end gap-4 px-4 pb-4">
                  <LikeButton
                    liked={false}
                    likesCount={thread.likes}
                    onClick={() => handleLike(thread.id)}
                  />
                  <button
                    onClick={() =>
                      setOpenComments(openComments === thread.id ? null : thread.id)
                    }
                    className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{thread.comments?.length ?? 0}</span>
                  </button>
                </div>

                {openComments === thread.id && (
                  <CommentSection
                    threadId={thread.id.toString()}
                    comments={(thread.comments ?? []).map((c) => ({
                      id: c.id.toString(),
                      author: c.user.email,
                      content: c.content,
                    }))}
                    onAddComment={(threadId, content) => handleAddComment(Number(threadId), content)}
                  />
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyThreads;
