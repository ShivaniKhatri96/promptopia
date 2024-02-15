"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearchChange = (term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    //updates the URL with the user's search data. For example, /dashboard/invoices?query=lee if the user searches for "Lee"
    replace(`${pathname}?${params.toString()}`);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);
  const query = searchParams.get("query")?.toString() || "";
  const filteredPosts = posts.filter(
    (post) =>
      query === "" ||
      post.tag.toLowerCase().includes(query.toLowerCase()) ||
      post.prompt.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          onChange={(e) => handleSearchChange(e.target.value)}
          required
          className="search_input peer"
          defaultValue={query}
        />
      </form>
      <Suspense fallback={<div>Loading...</div>}>
        <PromptCardList data={filteredPosts} handleTagClick={() => {}} />
      </Suspense>
    </section>
  );
};

export default Feed;
