"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import Nav from "@/components/Nav";
import PostCard from "@/components/PostCard";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await axios.post(
      "https://dev.stechvn.org/api/post/guest/new_feed?page=1",
      {
        list_post_id: [
          "0fc96c87-7796-4244-987d-ff86c24ace35",
          "post_id_2",
          "post_id_3",
        ],
        social_type: [
          "facebook",
          "instagram",
          "twitter",
          "twitch",
          "youtube",
          "tiktok",
          "with_friend",
        ],
        day: 1,
      }
    );
    const respondData = response.data;
    setPosts(respondData.data);
  };

  return (
    <>
      <Nav />
      <section className="mx-10">
        <div className="flex flex-col my-8">
          <span className="text-center text-3xl font-semibold uppercase">
            Posts
          </span>
        </div>

        <div className="columns-3 gap-6 space-y-6 justify-center mx-10 pb-20">
          {posts.length > 0 &&
            posts.map((post, i) => {
              return <PostCard key={i} post={post} />;
            })}
        </div>
      </section>
    </>
  );
};

export default Posts;
