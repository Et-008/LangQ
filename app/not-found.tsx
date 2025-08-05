import Image from "next/image";
import Image404 from "../public/svg/404.svg";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  title: "Lang Q | Not found page",
  description:
    "Lang Q is a professional translation service started to provide fast, accurate, and culturally-aware translations tailored for businesses looking to scale globally with confidence.",
  alternates: {
    canonical: `https://lang-q.com/not-found`,
  },
};

export default function Custom404() {
  return (
    <div className="flex flex-col gap-16 items-center justify-center min-h-[600px] mb-28">
      <Image src={Image404} alt="404 - Page Not Found" />
      <h1 className="sr-only">404 - Page Not Found</h1>

      <Button>
        <a href={defaultUrl}>Take me home</a>
      </Button>
    </div>
  );
}
