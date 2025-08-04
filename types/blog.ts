type Author = {
  name: string;
  image: string;
  designation: string;
};

export type Blog = {
  id: number | string;
  title: string;
  description: string;
  image: string;
  author: Author;
  tags: string[];
  publishDate: string;
  date: string;
};
