import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

const PrimaryBlog = ({ blog }: { blog: Blog }) => {
  const {
    title,
    image,
    description: paragraph,
    author,
    tags,
    id,
    date: publishDate,
  } = blog;
  return (
    <>
      <div className="lg:flex lg:h-[350px] group relative overflow-hidden rounded-lg bg-white shadow-one duration-300 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark">
        <Link
          href={`/blog/${id}`}
          className="relative block aspect-[37/22] lg:w-1/2"
        >
          <Image src={image} alt="image" fill />
        </Link>
        <div className="relative min-h-[200px] lg:max-h-[350px] p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <span className="absolute left-4 top-1 z-20 inline-flex items-center justify-center">
            {tags?.map((tag) => {
              return (
                <p
                  key={tag}
                  className="rounded-full px-2 py-1 bg-card text-xs font-semibold text-white mr-1"
                >
                  {tag}
                </p>
              );
            })}
          </span>
          <h3 className="mt-2 mb-4 text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl">
            <Link
              href={`/blog/${id}`}
              // className="block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
            >
              {title}
            </Link>
          </h3>
          <div className="h-max line-clamp-2 lg:line-clamp-5 mb-6 border-b border-body-color border-opacity-10 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
            {paragraph}
          </div>
          <div className="flex items-center">
            <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              {/* <div className="mr-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src={author.image} alt="author" fill />
                </div>
              </div> */}
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                  By {author.name}
                </h4>
                <p className="text-xs text-body-color">{author.designation}</p>
              </div>
            </div>
            <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                Date
              </h4>
              <p className="text-xs text-body-color">{publishDate}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrimaryBlog;
