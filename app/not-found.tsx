import Image from "next/image";
import Image404 from "../public/svg/404.svg";
import { Button } from "@/components/ui/button";

const defaultUrl = process.env.VERCEL_URL
  ? `${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

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
