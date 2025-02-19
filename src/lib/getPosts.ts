import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      id,
      ...(data as { title: string; date: string }),
    };
  }).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
  return fs.readdirSync(postsDirectory).map((fileName) => ({
    params: { id: fileName.replace(/\.md$/, "") },
  }));
}

export function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    id,
    content,
    ...(data as { title: string; date: string }),
  };
}