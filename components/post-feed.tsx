"use client";

import {useEffect, useRef} from "react";
import axios from "axios";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useIntersection} from "@mantine/hooks";
import {PAGINATION_LIMIT} from "@/constants";
import {Loader2} from "lucide-react";
import {ExtendedPost} from "@/types/db";
import {Post} from "@/components/post";
import {useAuthSession} from "@/hooks/use-auth-session";

interface Props {
  subredditName?: string;
  initialPosts: ExtendedPost[];
}

export const PostFeed = ({initialPosts, subredditName}: Props) => {
  const session = useAuthSession();

  const lastPostRef = useRef(null);
  const {ref, entry} = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["post-feed"],
    initialPageParam: 1,
    queryFn: async ({pageParam}) => {
      const query =
        `/api/posts?limit=${PAGINATION_LIMIT}&page=${pageParam}` +
        (!!subredditName ? `&subredditName=${subredditName}` : "");

      const {data} = await axios.get(query);
      return data as ExtendedPost[];
    },
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.length > 0 ? lastPageParam + 1 : undefined;
    },
    select: (data) => {
      return data.pages.flatMap((page) => page);
    },
    initialData: () => {
      return {pages: [initialPosts], pageParams: [1]};
    },
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry, hasNextPage, fetchNextPage]);

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {posts?.map((post, index) => {
        const votesAmt = post.votes.reduce((acc, vote) => {
          if (vote.type === "UP") return acc + 1;
          if (vote.type === "DOWN") return acc - 1;
          return acc;
        }, 0);

        const currentVote = post.votes.find(
          (vote) => vote.userId === session?.user.id
        );

        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={ref}>
              <Post
                post={post}
                commentAmt={post.comments.length}
                subredditName={post.subreddit.name}
                votesAmt={votesAmt}
                currentVote={currentVote}
              />
            </li>
          );
        } else {
          return (
            <li key={post.id}>
              <Post
                post={post}
                commentAmt={post.comments.length}
                subredditName={post.subreddit.name}
                votesAmt={votesAmt}
                currentVote={currentVote}
              />
            </li>
          );
        }
      })}

      {isFetchingNextPage && (
        <li className="flex justify-center">
          <Loader2 className="w-6 h-6 text-zinc-500 animate-spin" />
        </li>
      )}
    </ul>
  );
};
