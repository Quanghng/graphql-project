import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Comment {
  id: string;
  author: string;
  content: string;
}

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onAddComment: (postId: string, content: string) => void;
}

const CommentSection = ({ postId, comments, onAddComment }: CommentSectionProps) => {
  const [commentText, setCommentText] = useState("");

  const handleSend = () => {
    onAddComment(postId, commentText);
    setCommentText("");
  };

  return (
    <div className="px-4 pb-4">
      <div className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 space-y-2">
        <div className="flex gap-2">
          <Input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-grow"
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
        {comments.map((c) => (
          <div key={c.id} className="text-sm text-gray-700 dark:text-gray-200">
            <span className="font-medium">{c.author}:</span> {c.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
