"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/app/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

import Nav from "@/components/Nav";
import PostForm from "@/components/PostForm";
import MyPostCard from "@/components/MyPostCard";
import { useRouter } from "next/navigation";
// TODO: call api add post (without image/video) - oki --> hashtag array
// TODO: get post from firebase - oki
// TODO: if both success, create postcard to view - oki
// Add image/ video, - research ( upload file firebase ) - oki
// add handle to display image/video in postcard - if video then show iframe - image show <Image /> - oki

const Posts = () => {
  const { userInfo, currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
      return;
    }
    router.push("/posts/create-post");
  }, [currentUser]);

  // fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      const docRef = doc(db, "posts", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { posts: data } = docSnap.data();
        setPosts(data ?? []);
        console.log(docSnap.data());
      } else {
        console.log("Failed to load posts");
      }
    };
    fetchPosts();
  }, []);

  // handle add and add post into firestore
  const handleAddPost = async (post) => {
    const userRef = doc(db, "posts", currentUser?.uid ?? "");
    if (!post || post.caption === "" || post.social === "") {
      alert("Please choose a social or write caption");
      return false;
    }

    const newPost = {
      ...post,
      username: currentUser.displayName,
      avatar: currentUser.photoURL,
      hashtag: post.hashtag.split(" "),
      id: uuidv4(),
    };

    setPosts([...posts, newPost]);

    await setDoc(
      userRef,
      {
        posts: [...posts, newPost],
      },
      { merge: true }
    );
    setShowModal(false);
  };
  return (
    <>
      <Nav />
      <section className="mx-16">
        <div className="flex">
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="ml-auto py-2 px-3 text-sm text-white font-semibold rounded-full bg-[#ff70a7]"
          >
            Create Post
          </button>
        </div>
        <PostForm
          visible={showModal}
          onClose={() => setShowModal(false)}
          handleAddPost={handleAddPost}
        />
        <div className="columns-3 gap-6 space-y-6 justify-center mx-10 mt-6 mb-20">
          {userInfo && (
            <>
              {posts.length > 0 &&
                posts.map((post, i) => {
                  return <MyPostCard key={i} post={post} />;
                })}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Posts;
