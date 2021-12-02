export interface Bookmark {
  title: string;
  url: string; // key
  urlToImage: string;
}

export interface Info {
  token: string;
  bookmark: Bookmark[];
}


export interface articleInfo {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: null, name: string };
  title: string;
  url: string;
  urlToImage: string;
  isBookmark?: boolean;
}
