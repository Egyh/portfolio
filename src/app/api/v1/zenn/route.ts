import { NextResponse } from "next/server";
import { ZennApiResponse } from "@/types/zenn";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const zennUsername = process.env.ZENN_USERNAME;
    const zennApiUrl = process.env.ZENN_API_URL;

    const response = await fetch(
      `${zennApiUrl}/articles?username=${zennUsername}&order=latest`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 }, // 1時間キャッシュ
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data: ZennApiResponse = await response.json();

    // 最新5件の記事を返す
    const articles = data.articles.slice(0, 5).map((article) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      publishedAt: article.published_at,
      url: `https://zenn.dev${article.path}`,
      emoji: article.emoji,
      likedCount: article.liked_count,
      bodyLettersCount: article.body_letters_count,
      articleType: article.article_type,
      publication: article.publication?.name,
    }));

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Error fetching Zenn articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
