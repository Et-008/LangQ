import PrimaryBlog from "@/components/Blog/PrimaryBlog";
import SingleBlog from "@/components/Blog/SingleBlog";
import { getSortedPostsData } from "../../lib/posts";

import { Metadata } from "next";
import SubscriptionModal from "@/components/SubscriptionModal";

export const metadata: Metadata = {
  title: "Lang Q | Articles & Insights on Flutter Localization",
  description:
    "Stay updated with the latest tips, tutorials, and deep dives on localizing Flutter apps. Whether you're building your first multilingual app or scaling translations for millions of users, we’ve got you covered.",
  alternates: {
    canonical: `https://lang-q.com/blog`,
  },
};

const Blog = async () => {
  const response: any[] = await getSortedPostsData();

  return (
    <>
      {/* <Breadcrumb
        pageName="The LangQ Logs"
        description="AI, language, and the future of communication. Your guide to going global, fluently."
      /> */}
      <section className="pb-[120px] pt-[50px] max-w-[1100px] m-auto">
        <div className="containere">
          <div className="-mx-4 flex flex-wrap">
            {response.map((blog, index) => {
              if (index === 0) {
                return (
                  <div key={blog.id} className="px-4 w-full mb-10">
                    <PrimaryBlog blog={blog} />
                  </div>
                );
              }
              return (
                <div
                  key={blog.id}
                  className="px-4 mb-12 md:w-2/3 lg:w-1/2 xl:w-1/3"
                >
                  <SingleBlog blog={blog} />
                </div>
              );
            })}
          </div>

          {/* <div className="-mx-4 flex flex-wrap" data-wow-delay=".15s">
            <div className="w-full px-4">
              <ul className="flex items-center justify-center pt-8">
                <li className="mx-1">
                  <a
                    href="#0"
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    Prev
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    href="#0"
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    1
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    href="#0"
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    2
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    href="#0"
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    3
                  </a>
                </li>
                <li className="mx-1">
                  <span className="flex h-9 min-w-[36px] cursor-not-allowed items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color">
                    ...
                  </span>
                </li>
                <li className="mx-1">
                  <a
                    href="#0"
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    12
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    href="#0"
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    Next
                  </a>
                </li>
              </ul>
            </div>
          </div> */}
        </div>
      </section>
      <SubscriptionModal />
    </>
  );
};

export default Blog;
