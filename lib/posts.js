import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { notFound } from "next/navigation";

const postsDirectory = path.join(process.cwd(), "posts");

function isDateEarlierThanToday(dateToCheck) {
  const DateToCheck = new Date(dateToCheck);
  // Create a Date object for the current date and time
  const today = new Date();

  // Create a Date object for the start of today (midnight)
  // This ensures that only the date portion is compared, ignoring time
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  // Compare the timestamp of the dateToCheck with the timestamp of startOfToday
  return DateToCheck.getTime() < startOfToday.getTime();
}

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return (
    allPostsData
      // ?.filter((post) => !!isDateEarlierThanToday(post.date))
      .sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        } else {
          return -1;
        }
      })
  );
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);

  if (!fs.existsSync(fullPath)) {
    notFound(); // graceful fallback
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return {
    id,
    ...matterResult.data,
    content: contentHtml,
  };
}
