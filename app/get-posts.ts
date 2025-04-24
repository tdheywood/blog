import postsData from "./posts.json";
import commaNumber from "comma-number";

export type Post = {
  id: string;
  date: string;
  title: string;
  views: number;
  viewsFormatted: string;
};

export const getPosts = async () => {
  const posts = postsData.posts.map((post): Post => {
    // Set default view count to 0 since we're not using Redis
    const views = 0;
    return {
      ...post,
      views,
      viewsFormatted: commaNumber(views),
    };
  });
  return posts;
};
