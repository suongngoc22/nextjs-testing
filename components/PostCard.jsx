import moment from "moment/moment";
import Image from "next/image";
import React from "react";

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
import { checkMediaType } from "@/utils/checkMediaType";

const PostCard = ({ post }) => {
  const checkFileType = (link) => {
    if (link.includes("jpg")) {
      return true;
    }
    return false;
  };

  const renderMedia = (link, social_type) => {
    if (link) {
      let newLink = link;
      switch (social_type) {
        case "youtube":
          newLink = link.replace("watch?v=", "embed/");
          break;
        case "tiktok":
          newLink = `https://www.tiktok.com/embed/v2/${link
            .split("/")
            .pop()
            .toLowerCase()}`;
          break;
        case "twitter":
          newLink = `https://video.twimg.com/tweet_video/${link
            .split("/")
            .pop()
            .toLowerCase()}`;
          break;
        case "twitch":
          newLink = `https://player.twitch.tv?video=v${link
            .split("/")
            .pop()
            .toLowerCase()
            .concat("&parent=streamernews.example.com&autoplay=false")}`;
          break;
        default:
          break;
      }

      return (
        <iframe
          className="absolute inset-0"
          src={newLink}
          width="100%"
          height="100%"
        ></iframe>
      );
    }
    return <>Not supported</>;
  };

  const checkSocial = (social_type) => {
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

  return (
    <div
      className="break-inside-avoid p-4 border border-gray-200 rounded-3xl flex flex-col 
        justify-start gap-3 transition hover:shadow-lg"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src={
              post.main.social.avatar === null
                ? post.main.owner.avatar
                : post.main.social.avatar
            }
            alt="avatar"
            width={28}
            height={28}
            className="object-cover rounded-full w-[28px] h-[28px] cursor-pointer"
          />
          <div className="flex flex-col">
            <span className="text-xs font-semibold cursor-pointer">
              {post.main.social.username === null
                ? "Undefined User"
                : post.main.social.username}
            </span>
            <span className="text-[10px]">{`${
              moment(parseInt(post.main.created_at)).isBetween(
                moment().subtract(1, "days"),
                moment()
              )
                ? moment(parseInt(post.main.created_at)).fromNow()
                : moment(parseInt(post.main.created_at)).format("DD-MM-YYYY")
            }`}</span>
          </div>
        </div>
        <div className="flex gap-4">
          <Image
            src={checkSocial(post.main.social.social_type)}
            alt="social icon"
            width={17}
            height={17}
          />
          <Image src={menuVerticalIcon} alt="icon" width={17} height={17} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xs">
          {post.main.social.caption !== null &&
          post.main.social.caption.length > 250 ? (
            <>
              {post.main.social.caption.substring(0, 250)}
              <span className="text-blue-500"> Xem thêm...</span>
            </>
          ) : (
            post.main.social.caption
          )}
        </p>
        {post.main.social.hashtag && (
          <div className="flex flex-wrap space-x-1">
            {post.main.social.hashtag.map((tag) => (
              <span key={tag.id} className="text-[11px] text-blue-500">
                #{tag.name}
              </span>
            ))}
          </div>
        )}
        {checkFileType(post.main.social.media[0].link) ? (
          <Image
            src={post.main.social.media[0].link}
            width={300}
            height={300}
            className="w-full"
          />
        ) : (
          <div className="relative w-full pt-[56.25%]">
            {renderMedia(
              post.main.social.media[0].link,
              post.main.social.social_type,
              post.main.social.media[0].link
            )}
          </div>
        )}
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <Image src={heartIcon} alt="icon" width={17} height={17} />
          <span className="text-[11px]">{post.main.like_count}</span>
        </div>
        <div className="flex items-center gap-2">
          <Image src={commentIcon} alt="icon" width={17} height={17} />
          <span className="text-[11px]">{post.main.comment_count}</span>
        </div>
        <div className="flex items-center gap-2">
          <Image src={shareIcon} alt="icon" width={17} height={17} />
          <span className="text-[11px]">{post.main.share_count}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
