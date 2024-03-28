import {FC} from "react";
import {getAuthSession} from "@/lib/auth";
import {db} from "@/lib/db";
import {notFound} from "next/navigation";
import {INFINITE_SCROLL_PAGINATION_RESULTS} from "@/constants";
import {MiniCreatePost} from "@/components/mini-create-post";

interface SubredditPageProps {
  params: {
    slug: string;
  };
}

const SubredditPage: FC<SubredditPageProps> = async ({params}) => {
  const {slug} = params;
  const session = await getAuthSession();

  const subreddit = await db.subreddit.findFirst({
    where: {name: slug},
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
        take: INFINITE_SCROLL_PAGINATION_RESULTS,
      },
    },
  });

  if (!subreddit) return notFound();

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">
        r/{subreddit.name}
      </h1>
      <MiniCreatePost session={session} />
    </>
  );
};

export default SubredditPage;
