import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetUserWithThreadsQuery, useModifyThreadMutation, useDeleteThreadMutation } from "@/gql/generated";
import Layout from "@/components/Layout";
import LikeButton from "@/components/LikeButton";
import CommentSection from "@/components/CommentSection";
import { MessageCircle, Pencil, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MyThreads: React.FC = () => {
  // 1. read userId
  const userId = Number(localStorage.getItem("userId"));

  // 2. request user and Threads
  const { data, loading, error, refetch } = useGetUserWithThreadsQuery({
    variables: { id: userId },
  });

  // 3. Hooks： openComments、deleteId、editThread
  const [openComments, setOpenComments] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editThread, setEditThread] = useState<{
    id: number;
    title: string;
    content: string;
  } | null>(null);

  // 4. useMutation
  const [deleteThreadMutation] = useDeleteThreadMutation();
  const [modifyThreadMutation] = useModifyThreadMutation();

  // 5. error handling
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  // 6. fetch user data
  const user = data?.getUser;

  // 7. Like button handler
  const handleLike = (threadId: number) => {
    console.log("Liked thread", threadId);
    // TODO: Add mutation here
  };

  // 8. comment handler
  const handleAddComment = (threadId: number, content: string) => {
    console.log("Add comment to thread", threadId, ":", content);
    // TODO: Add mutation here
  };

  return (
    <Layout>
     <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 rounded-xl shadow-sm transition-colors">
        <div className="mb-10 border-b border-gray-300 dark:border-gray-700 pb-6">
          <h2 className="text-3xl font-bold mb-2 text-blue-700 dark:text-blue-300">
            👤 My Profile
          </h2>
         <div className="space-y-2">
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>First Name:</strong> {user?.firstName || "—"}</p>
            <p><strong>Last Name:</strong> {user?.lastName || "—"}</p>
         </div>
        </div>

        <h2 className="text-3xl font-extrabold mb-6 text-indigo-700 dark:text-indigo-300">
          🧵 My Threads
        </h2>

        {user?.getThreads?.length === 0 ? (
          <p className="text-gray-500">You haven’t posted anything yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...(user?.getThreads ?? [])]
            .sort((a, b) => a.id - b.id)
            .map((thread) => (
              <Card
                key={thread.id}
                className="relative hover:shadow-md transition duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <CardHeader className="flex justify-between items-start">
                  <Link to={`/post/${thread.id}`}>
                    <CardTitle>{thread.title}</CardTitle>
                  </Link>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setEditThread({
                          id: thread.id,
                          title: thread.title,
                          content: thread.content,
                        })
                      }
                      className="text-gray-500 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setDeleteId(thread.id)}
                      className="text-gray-500 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link to={`/post/${thread.id}`}>
                    <CardDescription>
                      {thread.content.substring(0, 100)}...
                    </CardDescription>
                    <p className="text-sm text-muted-foreground mt-2 text-gray-600 dark:text-gray-300">
                      by you
                    </p>
                  </Link>
                </CardContent>
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
                    onAddComment={(threadIdStr, content) =>
                      handleAddComment(Number(threadIdStr), content)
                    }
                  />
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* dialog for deleting thread */}
      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold mb-2">Are you sure you want to delete this thread?</h2>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              className="bg-red-500 text-white"
              onClick={async () => {
                if (deleteId !== null) {
                  await deleteThreadMutation({ variables: { id: deleteId } });
                  await refetch();
                  setDeleteId(null);
                }
              }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* dialog for editing thread */}
      <Dialog open={editThread !== null} onOpenChange={() => setEditThread(null)}>
      <DialogContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <h2 className="text-lg font-semibold mb-2">Edit Thread</h2>
        {editThread && (
            <form
            onSubmit={async (e) => {
                e.preventDefault();
                await modifyThreadMutation({
                variables: {
                    inputs: {
                    threadId: editThread.id,
                    title: editThread.title,
                    content: editThread.content,
                    },
                },
                });
                await refetch();
                setEditThread(null);
            }}
            className="space-y-4"
            >
            <Input
                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={editThread.title}
                onChange={(e) =>
                setEditThread((prev) => prev && { ...prev, title: e.target.value })
                }
                placeholder="Title"
            />
            <Input
                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={editThread.content}
                onChange={(e) =>
                setEditThread((prev) => prev && { ...prev, content: e.target.value })
                }
                placeholder="Content"
            />
            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => setEditThread(null)}>
                Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 text-white">
                Save
                </Button>
            </div>
            </form>
        )}
       </DialogContent>

      </Dialog>
    </Layout>
  );
};

export default MyThreads;
