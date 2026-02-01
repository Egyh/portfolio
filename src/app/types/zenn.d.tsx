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
