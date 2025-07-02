import { PAGINATION_LIMIT } from "@/constants";
import { db } from "@/lib/db";
import { PostFeed } from "@/components/post-feed";
import { getAuthSession } from "@/lib/get-auth-session";
import { Suspense } from "react";
import { notFound } from "next/navigation";

const CustomFeed = async () => {
  const session = await getAuthSession();

  if (!session) return notFound();

  const followedCommunities = await db.subscription.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      subreddit: true,
    },
  });

  const posts = await db.post.findMany({
    where: {
      subreddit: {
        name: {
          in: followedCommunities.map((sub) => sub.subreddit.name),
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      subreddit: true,
    },
    take: PAGINATION_LIMIT,
  });

  return <PostFeed initialPosts={posts} />;
};

export default CustomFeed;
