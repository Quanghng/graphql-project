import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_THREAD = gql`
  mutation CreateThread($title: String!, $content: String!) {
    createThread(title: $title, content: $content) {
      id
      title
      content
      likes
    }
  }
`;

interface CreateThreadModalProps {
  open: boolean;
  onClose: () => void;
  refetchThreads?: () => void;
}

const CreateThreadModal = ({ open, onClose, refetchThreads }: CreateThreadModalProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [createThread, { loading }] = useMutation(CREATE_THREAD);

  const handleSubmit = async () => {
    if (!title || !content) return;
    try {
      await createThread({ variables: { title, content } });
      if (refetchThreads) await refetchThreads();
      setTitle("");
      setContent("");
      setImage(null);
      onClose();
    } catch (err) {
      console.error("Create post failed", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-xl p-6 max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-700 dark:text-blue-400 text-center mb-4">
           Create a New Post
          </DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md"
        />

        <Textarea
          placeholder="Write your post here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md"
        />

        <label
          htmlFor="image-upload"
          className="mb-4 block w-full cursor-pointer bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow transition"
        >
          {image ? image.name : "📎 Choose an image"}
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="hidden"
        />

        <Button
          className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 rounded-md hover:shadow-lg transition"
          onClick={handleSubmit}
          disabled={loading}
        >
           {loading ? "Posting..." : "Post"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateThreadModal;
