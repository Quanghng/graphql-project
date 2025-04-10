import { useLikeThreadMutation, useUnlikeThreadMutation, usePostCommentMutation } from "@/gql/generated";

export const useThreadActions = () => {

  // Set up the mutation hooks
  const [likeThread] = useLikeThreadMutation();
  const [unlikeThread] = useUnlikeThreadMutation();
  const [postComment] = usePostCommentMutation();

  // Like hanlder
  const getLocalLiked = (threadId: number) =>
    JSON.parse(localStorage.getItem(`thread-liked-${threadId}`) || "false") ?? false;

  const setLocalLiked = (threadId: number, value: boolean) => {
    localStorage.setItem(`thread-liked-${threadId}`, JSON.stringify(value));
  };

  const toggleLikeThread = async (threadId: number, liked: boolean) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    setLocalLiked(threadId, !liked);
    try {
      if (liked) {
        await unlikeThread({ variables: { threadId } });
      } else {
        await likeThread({ variables: { threadId } });
      }
    } catch (err) {
      console.error("Error liking/unliking thread:", err);
      setLocalLiked(threadId, liked);
    }
  };

  // Comment handler
  const commentThread = async (userId: number, threadId: number, content: string) => {
    if (!content.trim()) return;
    try {
      await postComment({
        variables: {
          inputs: {
            userId,
            threadId,
            content,
          },
        },
      });
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  return { getLocalLiked, setLocalLiked, toggleLikeThread, commentThread };
};
