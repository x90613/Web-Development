import Link from "next/link";

import { Check, MessageCircle, Repeat2, Share } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { cn, getAvatar } from "@/lib/utils";

import LikeButton from "./LikeButton";
import TimeText from "./TimeText";
import Paper from "@mui/material/Paper";

type TweetProps = {
  username?: string;
  handle?: string;
  id: number;
  authorName: string;
  authorHandle: string;
  content: string;
  likes: number;
  createdAt: Date;
  liked?: boolean;
};

// note that the Tweet component is also a server component
// all client side things are abstracted away in other components
export default function Tweet({
  username,
  handle,
  id,
  authorName,
  authorHandle,
  content,
  likes,
  createdAt,
  liked,
}: TweetProps) {
  return (
    <>
      <Link
        className="w-full m-1 mb-3 px-4 pt-3 transition-colors bg-gray-100 hover:bg-gray-400 border border-gray-300 rounded"
        href={{
          pathname: `/tweet/${id}`,
          query: {
            username,
            handle,
          },
        }}
      >
        <div className="flex gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <article className="flex grow flex">
            {/* `white-space: pre-wrap` tells html to render \n and \t chracters  */}
            <article className="mt-2 whitespace-pre-wrap font-bold text-lg">{content}</article>
          </article>
          <div className="my-2 flex items-center justify-end gap-4 text-gray-400">
            {/* <LikeButton
              initialLikes={likes}
              initialLiked={liked}
              tweetId={id}
              handle={handle}
            /> */}
            {liked && <Check size={30} color="#2b883d" />}
            <div className="font-bold text-lg text-black">
              {likes === null ? 0 : likes}人參加
            </div>
 
          </div>
        </div>
      </Link>
    </>
  );
}
