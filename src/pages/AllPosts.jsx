import React, { useEffect } from "react";
import appwriteService from "../appwrite/config";
import Container from "../components/containers/Container";
import PostCard from "../components/PostCard";

function AllPosts() {
  const [post, setPost] = setPost([]);
  useEffect(() => {
    appwriteService.getPost([]).then((posts) => {
      if (posts) {
        setPost(posts.documents);
      }
    });
  }, []);
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
