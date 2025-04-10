import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LikeButton from "@/components/LikeButton";
import Layout from "@/components/Layout";
import { useGetThreadByIdQuery } from "@/gql/generated";
import { useThreadActions } from "@/lib/hooks/useThreadActions";



const SingleThread = () => {
  // Url params
  const { threadId } = useParams();

  // Local states
  const [liked, setLiked] = useState(false);   // Liked state for the thread
  const [content, setContent] = useState('');  // Comment content state

  // Set up the query hooks
  const { data, loading, error, refetch } = useGetThreadByIdQuery({variables: { threadId: Number(threadId) }});
  const thread = data?.getThread;

  // Set up the thread actions
  const { toggleLikeThread, commentThread, getLocalLiked } = useThreadActions();


  // Like/unlike handler
  useEffect(() => {
    setLiked(getLocalLiked(Number(threadId))); // Get the initial liked state from local storage
  }, [threadId]);

  const handleLike = async () => {
    setLiked(!liked); 
    // Update database and local storate
    await toggleLikeThread(Number(threadId),liked);
  };

  // Comment handler
  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    await commentThread(Number(thread?.user?.id), Number(threadId), content);
    // Optionally clear the content input after posting
    setContent('');
    // Refetch the thread to include the new comment (or update local state)
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading thread</p>;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl shadow-md mt-10 space-y-6">
      <div className="text-3xl font-semibold bg-gradient-to-r from-pink-600 via-purple-500 to-indigo-600 text-transparent bg-clip-text">
        {thread?.title}
      </div>
      <div className="text-xl font-semibold">{thread?.content}</div>
        {thread?.imageUrl && (
          <div className="mt-4">
            <img
              src={thread.imageUrl}
              alt="Thread Image"
              className="w-full rounded-lg"
            />
          </div>
        )}

        <LikeButton
          liked={liked}
          likesCount={Number(thread?.likes)}
          onClick={handleLike}
        />

        <form onSubmit={handleComment} className="flex gap-2">
          <Input
            placeholder="Write a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}  // Capture comment input
          />
          <Button type="submit">Post</Button>
        </form>

        <div className="space-y-4">
          {thread?.comments?.map((c) => (
            <div key={c.id} className="border-t border-gray-200 dark:border-gray-700 pt-2 text-sm">
              <strong className="text-gray-700 dark:text-gray-300">{c.user.email}:</strong>{" "}
              <span className="text-gray-800 dark:text-gray-100">{c.content}</span>
        </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SingleThread;
