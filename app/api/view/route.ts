import postsData from "@/app/posts.json";
import commaNumber from "comma-number";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id") ?? null;

  if (id === null) {
    return NextResponse.json(
      {
        error: {
          message: 'Missing "id" query',
          code: "MISSING_ID",
        },
      },
      { status: 400 }
    );
  }

  const post = postsData.posts.find(post => post.id === id);

  if (post == null) {
    return NextResponse.json(
      {
        error: {
          message: "Unknown post",
          code: "UNKNOWN_POST",
        },
      },
      { status: 400 }
    );
  }

  // Since we're not tracking views anymore, just return 0 views
  const views = 0;
  return NextResponse.json({
    ...post,
    views,
    viewsFormatted: commaNumber(views),
  });
}
