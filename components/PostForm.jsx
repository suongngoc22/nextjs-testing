"use client";
import cancelIcon from "@/public/icons/icons8-cancel.svg";
import Image from "next/image";
import { useAuth } from "@/app/AuthContext";
import { useState } from "react";

const PostForm = ({ visible, onClose, handleAddPost }) => {
  const { currentUser } = useAuth();
  const [post, setPost] = useState({
    caption: "",
    hashtag: "",
    social: "",
    fileUpload: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleClearForm = () => {
    setPost({
      caption: "",
      hashtag: "",
      social: "",
      fileUpload: null,
    });
    setPreviewImage(null);
  };

  const handleImageChange = (e) => {
    const validType = ["jpg", "jpeg", "png", "mp4"];
    const file = e.target.files[0];
    const fileType = file.name.split(".").pop().toLowerCase();
    const isValid = validType.some((type) => type === fileType);
    const reader = new FileReader();

    if (isValid) {
      reader.onload = () => {
        setPreviewImage(reader.result); //data:image
        setPost({
          ...post,
          fileUpload: reader.result,
        });
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      alert("File not supported");
    }
  };

  const checkMediaFromDataUrl = (file) => {
    if (file.includes("data:image")) {
      return <Image src={file} width={200} height={200} alt="image" />;
    } else if (file.includes("data:video")) {
      return <iframe src={file} width={400} height={200} />;
    } else {
      return <span>Not supported!</span>;
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white py-4 px-6 rounded-3xl w-[50%] mx-auto flex flex-col gap-4">
        <form className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            {
              <Image
                onClick={() => {
                  onClose();
                  handleClearForm();
                }}
                src={cancelIcon}
                alt="cancel"
                width={16}
                height={16}
                className="cursor-pointer hover:scale-125 transition duration-300"
              />
            }
            <span className="text-sm font-semibold">Create New Post</span>
            <span
              className="text-sm font-semibold text-[#ff70a7] cursor-pointer"
              onClick={async () => {
                const res = await handleAddPost(post);
                res !== false && handleClearForm();
              }}
            >
              Post
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                src={currentUser?.photoURL}
                alt="avatar"
                width={28}
                height={28}
                className="object-cover rounded-full w-[28px] h-[28px] cursor-pointer"
              />
              <span className="text-xs font-semibold cursor-pointer">
                {currentUser.displayName}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4 text-xs">
            <textarea
              placeholder="Have something to share with everyone?"
              value={post.caption}
              rows={5}
              onChange={(e) => {
                setPost({ ...post, caption: e.target.value });
              }}
              className="w-full outline-none resize-none"
            />
            <input
              type="text"
              placeholder="#..."
              value={post.hashtag}
              onChange={(e) => {
                setPost({ ...post, hashtag: e.target.value });
              }}
              className="w-full outline-none text-xs"
            />
            <input type="file" onChange={(e) => handleImageChange(e)} />
            {previewImage && checkMediaFromDataUrl(previewImage)}
            <select
              value={post.social}
              onChange={(e) => setPost({ ...post, social: e.target.value })}
              className="p-2 rounded shadow-md focus:outline-none"
            >
              <option disabled={true} value="">
                Choose a social
              </option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="Twitch">Twitch</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
