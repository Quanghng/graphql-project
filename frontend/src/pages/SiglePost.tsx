import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mockPost = {
  id: "1",
  title: "Welcome to GraphQL Social!",
  content: "This is a mock post to simulate the detail view.",
  createdAt: "2025-04-06T12:00:00Z",
  author: { name: "Alice" },
  comments: [
    {
      id: "c1",
      text: "Great post!",
      user: { name: "Bob" },
      createdAt: "2025-04-06T14:00:00Z"
    },
    {
      id: "c2",
      text: "Thanks for sharing.",
      user: { name: "Charlie" },
      createdAt: "2025-04-06T15:00:00Z"
    }
  ],
  likes: 3,
};

const SinglePost = () => {
  const { articleId } = useParams();
  const post = mockPost;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-4">
        <Button variant="outline" asChild>
          <a href="/" className="flex items-center gap-2">
            ← Back to Home
          </a>
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-2 text-muted-foreground">
            by {post.author.name} • {new Date(post.createdAt).toLocaleString()}
          </CardDescription>
          <p className="mb-4 text-gray-800">{post.content}</p>
          <div className="text-sm text-muted-foreground">👍 {post.likes} Likes</div>
        </CardContent>
      </Card>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Leave a comment</h3>
        <div className="flex gap-2">
          <Input placeholder="Write a comment..." className="flex-grow" />
          <Button>Submit</Button>
        </div>
      </div>

      <div className="space-y-4">
        {post.comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {comment.user.name} • {new Date(comment.createdAt).toLocaleString()}
              </p>
              <p className="mt-1 text-gray-700">{comment.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SinglePost;
