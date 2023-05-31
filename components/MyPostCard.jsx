import heartIcon from "@/public/icons/heart.svg";
import shareIcon from "@/public/icons/share.svg";
import commentIcon from "@/public/icons/chat-circle.svg";
import menuVerticalIcon from "@/public/icons/menu-vertical.svg";
import youtubeIcon from "@/public/icons/youtube.svg";
import facebookIcon from "@/public/icons/facebook.svg";
import instagramIcon from "@/public/icons/instagram.svg";
import twitterIcon from "@/public/icons/twitter.svg";
import tiktokIcon from "@/public/icons/tiktok.svg";
import twitchIcon from "@/public/icons/twitch.svg";
import Image from "next/image";

const MyPostCard = ({ post }) => {
  console.log(post);
  const checkSocial = (social_type) => {
    social_type = social_type.toLowerCase();
    let icon = "";
    switch (social_type) {
      case "youtube":
        icon = youtubeIcon;
        break;
      case "facebook":
        icon = facebookIcon;
        break;
      case "twitter":
        icon = twitterIcon;
        break;
      case "instagram":
        icon = instagramIcon;
        break;
      case "tiktok":
        icon = tiktokIcon;
        break;
      case "twitch":
        icon = twitchIcon;
        break;
    }
    return icon;
  };

  const checkMediaFromDataUrl = (file) => {
    if (file.includes("data:image")) {
      return <Image src={file} width={300} height={300} className="w-full" />;
    } else if (file.includes("data:video")) {
      return <iframe src={file} width="100%" height="100%" />;
    } else {
      return <span>Not supported!</span>;
    }
  };

  return (
    <div
      className="break-inside-avoid p-4 border border-gray-200 rounded-3xl flex flex-col
    justify-start gap-3 transition hover:shadow-lg"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src={post.avatar}
            alt="avatar"
            width={28}
            height={28}
            className="object-cover rounded-full w-[28px] h-[28px] cursor-pointer"
          />
          <div className="flex flex-col">
            <span className="text-xs font-semibold cursor-pointer">
              {post.username}
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          <Image
            src={checkSocial(post.social)}
            alt="social icon"
            width={17}
            height={17}
          />
          <Image src={menuVerticalIcon} alt="icon" width={17} height={17} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xs">{post.caption}</p>
        {post.hashtag && (
          <div className="flex flex-wrap gap-2">
            {post.hashtag.map((tag) => (
              <span className="text-[11px] text-blue-500 cursor-pointer hover:underline">
                {tag}
              </span>
            ))}
          </div>
        )}
        {post.fileUpload && checkMediaFromDataUrl(post.fileUpload)}
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <Image
            src={heartIcon}
            alt="icon"
            width={17}
            height={17}
            className="cursor-pointer"
          />
          <span className="text-[11px]">0</span>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={commentIcon}
            alt="icon"
            width={17}
            height={17}
            className="cursor-pointer"
          />
          <span className="text-[11px]">0</span>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={shareIcon}
            alt="icon"
            width={17}
            height={17}
            className="cursor-pointer"
          />
          <span className="text-[11px]">0</span>
        </div>
      </div>
    </div>
  );
};

export default MyPostCard;
