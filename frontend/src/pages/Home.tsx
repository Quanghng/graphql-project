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

const mockArticles = [
  {
    id: "1",
    title: "Test Article 1",
    content: "This is a placeholder content for the article.",
    likes: 10,
    author: { name: "Alice" },
  },
  {
    id: "2",
    title: "Test Article 2",
    content: "Another test article.",
    likes: 5,
    author: { name: "Bob" },
  },
];

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loginState = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginState);
  }, []);

  const handlePost = () => {
    if (isLoggedIn) {
      alert("Post published successfully!");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Recent Posts</h1>
        <div className="flex gap-2">
          {isLoggedIn ? (
            <>
              <Button
                onClick={handleLogout}
                variant="outline"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="mb-6">
        <Input placeholder="Search articles..." className="w-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockArticles.map((article) => (
          <Link to={`/article/${article.id}`} key={article.id}>
            <Card className="hover:shadow-lg transition duration-200">
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {article.content.substring(0, 100)}...
                </CardDescription>
                <p className="text-sm text-muted-foreground mt-2">
                  by {article.author.name}
                </p>
              </CardContent>
              <div className="p-4 pt-0 text-right text-sm">
                👍 {article.likes} Likes
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center border-t pt-8">
        <h2 className="text-2xl font-semibold mb-4">🖊️ Ready to share your thoughts?</h2>
        <p className="text-gray-600 mb-6">Join the conversation and publish your first article.</p>
        <Button
          onClick={handlePost}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 text-lg rounded-full shadow hover:shadow-xl transition"
        >
          ✍️ Post your article
        </Button>
      </div>
    </div>
  );
};

export default Home;
