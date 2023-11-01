import Link from "next/link";

import { MessageCircle, Repeat2, Share } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { getAvatar } from "@/lib/utils";

import LikeButton from "./LikeButton";
import TimeText from "./TimeText";

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
        className="w-full px-4 pt-3 transition-colors hover:bg-gray-50"
        href={{
          pathname: `/tweet/${id}`,
          query: {
            username,
            handle,
          },
        }}
      >
        <div className="flex gap-4">
          <article className="flex grow flex">
            <article className="mt-2 whitespace-pre-wrap">{content}</article>
          </article>
          <div className="flex items-center justify-end">
              <LikeButton 
                initialLikes={likes}
                initialLiked={liked}
                tweetId={id}
                handle={handle}
              />
          </div>
        </div>
      </Link>
      <Separator />
    </>
  );
}
