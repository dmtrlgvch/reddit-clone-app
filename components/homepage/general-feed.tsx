import { PAGINATION_LIMIT } from "@/constants";
import { db } from "@/lib/db";
import { PostFeed } from "@/components/post-feed";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const GeneralFeed = async () => {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      subreddit: true,
      votes: true,
      author: true,
      comments: true,
    },
    take: PAGINATION_LIMIT,
  });

  return <PostFeed initialPosts={posts} />;
};

export default GeneralFeed;
