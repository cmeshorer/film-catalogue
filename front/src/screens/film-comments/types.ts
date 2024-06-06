export interface FilmCommentsScreenProps {}

export interface CommentBackend {
  author: string;
  author_details: {
    avatar_path: string;
    name: string;
    rating: number;
    username: string;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export type CommentsBackend = CommentBackend[];

export interface Comment {
  author: string;
  avatar: string;
  content: string;
  date: string;
  id: string;
  rating: number;
}

export type Comments = Comment[];
