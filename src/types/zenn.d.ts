export interface ZennArticle {
  id: number;
  title: string;
  slug: string;
  published_at: string;
  path: string;
  emoji: string;
  liked_count: number;
  body_letters_count: number;
  article_type: string;
  publication?: {
    name: string;
  };
}

export interface ZennApiResponse {
  articles: ZennArticle[];
  next_page: number | null;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  publishedAt: string;
  url: string;
  emoji: string;
  likedCount: number;
  bodyLettersCount: number;
  articleType: string;
  publication?: string;
}

export interface ZennArticlesResponse {
  articles: Article[];
}
