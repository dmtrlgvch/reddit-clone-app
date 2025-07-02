import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { MiniCreatePost } from "@/components/mini-create-post";
import { PostFeed } from "@/components/post-feed";
import { PAGINATION_LIMIT } from "@/constants";
import { Suspense } from "react";

interface Props {
  params: {
    slug: string;
  };
}

const SubredditPage = async ({ params }: Props) => {
  const { slug } = params;

  const subreddit = await db.subreddit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: PAGINATION_LIMIT,
      },
    },
  });

  if (!subreddit) return notFound();

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">r/{subreddit.name}</h1>
      <MiniCreatePost />

      <PostFeed initialPosts={subreddit.posts} subredditName={subreddit.name} />
    </>
  );
};

export default SubredditPage;
