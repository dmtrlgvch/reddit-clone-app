import {z} from "zod";

export const SubredditSchema = z.object({
  name: z.string().min(3).max(21),
});

export const SubredditSubscriptionSchema = z.object({
  subredditId: z.string(),
});

export type CreateSubredditType = z.infer<typeof SubredditSchema>;
export type SubscribeToSubredditType = z.infer<
  typeof SubredditSubscriptionSchema
>;
